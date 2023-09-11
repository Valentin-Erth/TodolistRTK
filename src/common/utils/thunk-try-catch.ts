import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/error-utils";
import { AxiosError } from "axios";
import { appActions } from "app/app.slice";

/**
* If the logic function completes without errors, thunkTryCatch returns the result of executing this function.
* If the logic function fails, thunkTryCatch returns an object with two properties:
  * errorMessage - the error message that was thrown by logic.
* showGlobalError - a boolean value indicating whether to show a global error message. By default, this value is false.
*
* @param thunkAPI - object BaseThunkAPI, from redux for handling async actions
* @param afterResolveFoo - func, to do into try-catch for error handling
* @param showGlobalError  - not required param, which specifies whether to show a global error message. The default value is false.
*/
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, unknown>,
  afterResolveFoo: Function,
  showGlobalError?: boolean
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    return await afterResolveFoo();
  } catch (e) {
    handleServerNetworkError(e as AxiosError, dispatch);
    return rejectWithValue(null);
  } finally {
    {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    }
  }
};