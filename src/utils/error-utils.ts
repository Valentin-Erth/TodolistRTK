import { appActions } from "app/app.slice";
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import { AppDispatch } from "app/store";
import axios from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0] }))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}


export const handleServerNetworkError = (err: unknown, dispatch:Dispatch ):void => {
    let errorMessage = "Some error occurred";

    // ❗Проверка на наличие axios ошибки
    if (axios.isAxiosError(err)) {
        // debugger
        // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
        // ⏺️ err?.message - например при создании таски в offline режиме
        errorMessage = err.response?.data?.message || err?.message || errorMessage;
        // ❗ Проверка на наличие нативной ошибки
    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
        // ❗Какой-то непонятный кейс
    } else {
        errorMessage = JSON.stringify(err);
    }
    dispatch(appActions.setAppError({ error: errorMessage }));
    dispatch(appActions.setAppStatus({ status: "failed" }));
};
export const _handleServerNetworkError = (error: { message: string }, dispatch:Dispatch) => {
    dispatch(appActions.setAppError({error:error.message ? error.message : 'Some error occurred'}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
