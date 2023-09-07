import { appActions, RequestStatusType } from "app/app.slice";
import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";
import { AppRootStateType, AppThunk } from "app/store";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { todolistsAPI, TodolistType } from "features/TodolistsList/api/todolists.api";
import { createAppAsyncThunk } from "common/utils";
import { changeOrderTaskTC } from "features/Tasks/model/tasks.slice";

const slice = createSlice({
  name: "todolists",
  initialState: {
    todoList: [] as TodolistDomainType[]
  },
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
      const index = state.todoList.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state.todoList[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
      const index = state.todoList.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state.todoList[index].entityStatus = action.payload.entityStatus;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        state.todoList = action.payload.map(el => ({ ...el, filter: "all", entityStatus: "idle" }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.todoList.findIndex(todo => todo.id === action.payload);
        if (index !== -1) state.todoList.splice(index, 1);
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.todoList.unshift({ ...action.payload, filter: "all", entityStatus: "idle" });
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        if (action.payload) {
          const todo = state.todoList.find(el => el.id === action.payload?.id);
          if (todo) todo.title = action.payload.title;
        }
      })
      .addCase(changeOrderTodolistTC.pending, (state, action)=>{
        const {oldTodoIndex, newTodoIndex}=action.meta.arg
        const changedTodo = state.todoList[oldTodoIndex]
        state.todoList.splice(oldTodoIndex, 1)
        state.todoList.splice(newTodoIndex, 0, changedTodo)
      })
  }
});


// thunks
const fetchTodolists = createAppAsyncThunk<TodolistType[]>("todolists/fetchTodolists", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return res.data;
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const removeTodolist = createAppAsyncThunk<string, { todolistId: string }>("todolists/removeTodolist", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.deleteTodolist(arg.todolistId);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg.todolistId;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const addTodolist = createAppAsyncThunk<TodolistType, string>("todolists/addTodolist", async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.createTodolist(title);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return res.data.data.item;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const changeTodolistTitle = createAppAsyncThunk< {id: string, title: string}, {id: string, title: string}>("todolists/changeTodolistTitle", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistsAPI.updateTodolist(arg.id, arg.title);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const changeOrderTodolistTC = createAsyncThunk(
  "todosSlice/changeOrderTodoTC",
  async (data: ChangeOrderTodoType, { dispatch, rejectWithValue, getState }) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      if (data.newTodoIndex === 0) {
        await todolistsAPI.reorder(data.todoId, null);
      } else {
        const { todolists } = getState() as AppRootStateType;
        const idAfterWhichTodo = todolists.todoList[data.newTodoIndex - 1].id;

        await todolistsAPI.reorder(data.todoId, idAfterWhichTodo);
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
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type ChangeOrderTodoType = {
  todoId: string
  newTodoIndex: number
  oldTodoIndex: number
}
export const todolistsSlice = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle };
