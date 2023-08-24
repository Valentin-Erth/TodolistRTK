import { TaskType, todolistsAPI } from "api/todolists-api";
import { AppRootStateType } from "app/store";
import { appActions } from "app/app.slice";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UpdateModelType } from "features/tasks/tasksTypes";

// const initialState: TasksStateType = {};
const slice = createSlice({
  name: "tasks",
  initialState: {
    taskList: [] as TaskType[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        if (action.payload) {
          state.taskList = action.payload.tasks;
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        action.payload && state.taskList.unshift(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.taskList.findIndex(el => el.id === action.payload);
          state.taskList.splice(index, 1);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.taskList.findIndex(el => el.id === action.payload?.id);

          state.taskList[index] = action.payload;
        }
      });
    builder.addCase(changeOrderTaskTC.pending, (state, action) => {
      const { oldTaskIndex, newTaskIndex } = action.meta.arg;
      const tasks = state.taskList;
      const changedTask = tasks[oldTaskIndex];

      tasks.splice(oldTaskIndex, 1);
      tasks.splice(newTaskIndex, 0, changedTask);
    });
  }
});

// thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTasks("todolistId");
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch)
    return rejectWithValue(null);
  }


});
export const removeTask = createAsyncThunk("tasks/removeTask", async (arg: {
  taskId: string,
  todolistId: string
}, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg.taskId;
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch);
    return rejectWithValue(null);
  }

});

export const addTask = createAsyncThunk("tasks/addTask", async (data: { todoId: string; title: string }, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.createTask(data.todoId, data.title);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return res.data.data.item;
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
    return rejectWithValue(null);
  }
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (data: UpdateTaskType, {
  dispatch,
  getState,
  rejectWithValue
}) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const { tasks } = getState() as AppRootStateType;
  const task = tasks.taskList.find(el => el.id === data.taskId);
  if (task) {
    const model: UpdateModelType = {
      title: task.title,
      status: task.status,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
      description: task.description,
      completed: task.completed,
      ...data.model
    };
    try {
      const res = await todolistsAPI.updateTask(data.todoId, data.taskId, model);

      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));

        return res.data.data.item;
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError, dispatch);

      return rejectWithValue(null);
    }
  }
});

export const changeOrderTaskTC = createAsyncThunk(
  "tasksSlice/changeOrderTaskTC",
  async (data: ChangeOrderTaskType, { dispatch, getState, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      if (data.newTaskIndex === 0) {
        await todolistsAPI.reorderTask(data.todoId, data.taskId, null);
      } else {
        const { tasks } = getState() as AppRootStateType;
        const idAfterWhichTask = tasks.taskList[data.newTaskIndex - 1].id;

        await todolistsAPI.reorderTask(data.todoId, data.taskId, idAfterWhichTask);
      }
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return data;
    } catch (e) {
      handleServerNetworkError(e as AxiosError, dispatch);

      return rejectWithValue(null);
    }
  }
);

// types
export type UpdateDomainModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
type UpdateTaskType = {
  todoId: string
  taskId: string
  model: UpdateDomainModelType
}
export type ChangeOrderTaskType = {
  todoId: string
  taskId: string
  newTaskIndex: number
  oldTaskIndex: number
}
export const tasksActions = slice.actions;
export const tasksSlice = slice.reducer;
export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask, changeOrderTaskTC };

