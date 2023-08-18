import { tasksSlice } from "features/TodolistsList/tasks.slice";
import { todolistsSlice } from "features/TodolistsList/todolists.slice";
import { AnyAction, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appSlice } from "app/app.slice";
import { authSlice } from "features/Login/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { saveTheme } from "common/utils/localStorage-utils";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsSlice,
  app: appSlice,
  auth: authSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
});
store.subscribe(() => {
  saveTheme(store.getState().app.theme);
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// @ts-ignore
window.store = store;
