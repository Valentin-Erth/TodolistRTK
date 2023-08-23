import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'


import { appActions } from "app/app.slice";
import { ResponseType } from "api/todolists-api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({error: "Some Error" }))
  }
  dispatch(appActions.setAppStatus({status: "failed" }))
}

export const handleServerNetworkError = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch
) => {
  if (axios.isAxiosError(e)) {
    const error: string = e.response?.data ? e.response.data.error : e.message

    dispatch(appActions.setAppError({ error }))
    dispatch(appActions.setAppStatus({status: "failed" }))
  }
}
