import { baseInstance } from "common/instance/baseInstance";
import { ResponseType } from "features/TodolistsList/api/todolists.api";

export const authAPI = {
  login(data: LoginParamsType) {
    return baseInstance.post<ResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return baseInstance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return baseInstance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
  }
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}