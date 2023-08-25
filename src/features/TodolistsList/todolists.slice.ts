import { appActions, RequestStatusType } from "app/app.slice";
import { handleServerNetworkError } from "common/utils/error-utils";
import { AppRootStateType, AppThunk } from "app/store";
import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { todolistsAPI, TodolistType } from "./todolists.api";

const initialState: Array<TodolistDomainType> = [];
const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      console.log(current(state));
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      // const index = state.findIndex(todo => todo.id === action.payload.id);
      // if (index !== -1) state[index].title = action.payload.title;

      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {

      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }
  }
});


// thunks
const fetchTodolists = createAsyncThunk("todolists/fetchTodolists", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const res = await todolistsAPI.getTodolists();
  try {
    dispatch(todolistsActions.setTodolists({ todolists: res.data }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
});
export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: "loading" }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistsActions.changeTodolistEntityStatus({ id: todolistId, entityStatus: "loading" }));
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(todolistsActions.removeTodolist({ id: todolistId }));
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      });
  };
};
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      });
  };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(todolistsActions.changeTodolistTitle({ id, title }));
      });
  };
};
export const changeOrderTodolistTC = createAsyncThunk(
  'todosSlice/changeOrderTodoTC',
  async (data: ChangeOrderTodoType, { dispatch, rejectWithValue, getState }) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      if (data.newTodoIndex === 0) {
        await todolistsAPI.reorder(data.todoId, null)
      } else {
        const { todolists } = getState() as AppRootStateType
        const idAfterWhichTodo = todolists[data.newTodoIndex - 1].id

        await todolistsAPI.reorder(data.todoId, idAfterWhichTodo)
      }
      dispatch(appActions.setAppStatus({status: "succeeded" }))

      return data
    } catch (e) {
      handleServerNetworkError(e as AxiosError, dispatch)

      return rejectWithValue(null)
    }
  }
)

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
export const todolistsThunks = { fetchTodolists };
