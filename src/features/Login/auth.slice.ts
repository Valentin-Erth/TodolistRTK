import { authAPI, LoginParamsType } from "api/todolists-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app.slice";
import { AxiosError } from "axios";
import { todolistsThunks } from "features/TodolistsList/todolists.slice";


const sliceAuth = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }
  }
});


// thunks
export const login=createAsyncThunk('auth/login', async (data:LoginParamsType, { dispatch })=>{
  dispatch(appActions.setAppStatus({status: 'loading'}))
  try {
    const res = await authAPI.login(data)
    if(res.data.resultCode === 0 ){
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error){
    handleServerNetworkError(error as AxiosError , dispatch)
  }
})
const logout=createAsyncThunk('auth/logout',async (_, {dispatch})=>{
  dispatch(appActions.setAppStatus({status: 'loading'}))
  try {
    const res= await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
      dispatch(appActions.setAppStatus({status: 'succeeded'}))
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error){
    handleServerNetworkError(error as AxiosError, dispatch);
  }
} )

export const authActions = sliceAuth.actions
export const authSlice=sliceAuth.reducer
export const authThunks={login, logout}
