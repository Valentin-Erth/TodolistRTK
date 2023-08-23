import { Layout } from "common/hoc/Layout";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotSelectTodo } from "features/TodolistsList/NotSelectTodo/NotSelectTodo";

import { NotFound } from "components";
import { Tasks } from "features/tasks/Tasks";
import { Login } from "features/Login/Login";

export const PATH = {
  TASK_LIST: '/todos/:todoId/*',
  LOGIN: '/login',
  NOT_FOUNT: '/404',
}

export const Pages = () => (
  <Routes>
    <Route path={'/'} element={<Layout />}>
      <Route index element={<NotSelectTodo />} />
      <Route path={PATH.TASK_LIST} element={<Tasks />} />
    </Route>

    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.NOT_FOUNT} element={<NotFound />} />
    <Route path={'*'} element={<Navigate to={PATH.NOT_FOUNT} />} />
  </Routes>
)