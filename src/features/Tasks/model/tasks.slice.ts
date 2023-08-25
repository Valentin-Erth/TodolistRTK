import { AppRootStateType } from "app/store";
import { appActions } from "app/app.slice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TaskType, UpdateModelType } from "features/Tasks/api/tasks.types";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { tasksAPI } from "features/Tasks/api/tasks.api";


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
export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>("Tasks/fetchTasks", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
    return rejectWithValue(null);
  }


});
export const removeTask = createAppAsyncThunk<string,{
  taskId: string,
  todolistId: string
}>("Tasks/removeTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg.taskId;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }

});

export const addTask = createAppAsyncThunk<TaskType, { todoId: string; title: string }>("Tasks/addTask", async (data, {
  dispatch,
  rejectWithValue
}) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await tasksAPI.createTask(data.todoId, data.title);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return task;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
    return rejectWithValue(null);
  }
});

export const updateTask = createAppAsyncThunk<TaskType, UpdateTaskType>("Tasks/updateTask", async (data, {
  dispatch,
  getState,
  rejectWithValue
}) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const { tasks } = getState();
    const task = tasks.taskList.find(el => el.id === data.taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found" }));
      return rejectWithValue(null);
    }
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

    const res = await tasksAPI.updateTask(data.todoId, data.taskId, model);

    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      const task = res.data.data.item;
      return task;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
    return rejectWithValue(null);
  }

});

export const changeOrderTaskTC = createAsyncThunk(
  "tasksSlice/changeOrderTaskTC",
  async (data: ChangeOrderTaskType, { dispatch, getState, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      if (data.newTaskIndex === 0) {
        await tasksAPI.reorderTask(data.todoId, data.taskId, null);
      } else {
        const { tasks } = getState() as AppRootStateType;
        const idAfterWhichTask = tasks.taskList[data.newTaskIndex - 1].id;

        await tasksAPI.reorderTask(data.todoId, data.taskId, idAfterWhichTask);
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

