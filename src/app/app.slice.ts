import { authAPI } from "../api/todolists-api";
import { authActions } from "features/Login/auth.slice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";

// const initialState = {
//   status: "idle" as RequestStatusType,
//   error: null as string | null,
//   isInitialized: false
// };
// export type InitialStateType = typeof initialState

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string| null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action:PayloadAction<{status: RequestStatusType}>)=>{
      state.status=action.payload.status
    },
    setAppInitialized: (state, action:PayloadAction<{isInitialized: boolean}>)=>{
      state.isInitialized=action.payload.isInitialized
    }
  }
});

export const initializeAppTC = ():AppThunk => (dispatch) => {
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      } else {
      }
      dispatch(appActions.setAppInitialized({isInitialized:true}));
    });
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export const appActions=slice.actions
export const appSlice=slice.reducer

