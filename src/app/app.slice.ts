import { authActions } from "features/Login/model/auth.slice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerNetworkError } from "common/utils/error-utils";
import { AxiosError } from "axios";
import { authAPI } from "features/Login/api/auth.api";

// const initialState = {
//   status: "idle" as RequestStatusType,
//   error: null as string | null,
//   isInitialized: false
// };
// export type InitialStateType = typeof initialState
export type ThemeType = "light" | "dark"
const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
    theme: "light" as ThemeType
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      // debugger
      state.theme = action.payload;
    }
  }
});

export const initializeApp = createAsyncThunk("app/initializeApp", async (_, { dispatch }) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      dispatch(appActions.setAppStatus({ status: "failed" }));
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
})
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export const appActions = slice.actions;
export const appSlice = slice.reducer;

export const appThunks={initializeApp}