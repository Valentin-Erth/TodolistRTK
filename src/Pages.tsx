import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { NotSelectTodo } from "features/TodolistsList/ui/NotSelectTodo/NotSelectTodo";
// import { NotFound } from "common/components";
// import { Tasks } from "features/Tasks/ui/Tasks";
import { Layout } from "common/hoc/Layout";
import { Login } from "features/Login/ui/Login";
const NotSelectTodo = lazy(() => import ("features/TodolistsList/ui/NotSelectTodo/NotSelectTodo"));
const NotFound = lazy(() => import ("common/components/NotFound/NotFound"));
// const Login = lazy(() => import ("features/Login/ui/Login"));
const Tasks = lazy(() => import ("features/Tasks/ui/Tasks"));
export const PATH = {
  TASK_LIST: "/todos/:todoId/*",
  LOGIN: "/login",
  NOT_FOUNT: "/404"
};

export const Pages = () => (
  <Routes>
    <Route path={"/"} element={<Layout />} >
    <Route index element={<NotSelectTodo />} />
    <Route path={PATH.TASK_LIST} element={<Tasks />} />
    </Route>
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.NOT_FOUNT} element={<NotFound />} />
    <Route path={"*"} element={<Navigate to={PATH.NOT_FOUNT} />} />
  </Routes>
);