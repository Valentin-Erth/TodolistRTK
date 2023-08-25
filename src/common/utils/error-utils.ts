import { appActions } from "app/app.slice";
import { Dispatch } from "redux";
import axios from "axios";
import { ResponseType } from "features/TodolistsList/api/todolists.api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};


export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error occurred";
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
    //  Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
    // Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err);
  }
  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
