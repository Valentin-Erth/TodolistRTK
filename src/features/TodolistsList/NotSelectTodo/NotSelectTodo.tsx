import { ReactComponent as SelectObject } from 'assets/img/select-object.svg'
import React from 'react'
import { NotSelectTodoTitle, NotSelectTodoWrapper } from "features/TodolistsList/NotSelectTodo/styled/styled";

export const NotSelectTodo = () => {
  return (
    <NotSelectTodoWrapper>
      <NotSelectTodoTitle>Select Project</NotSelectTodoTitle>
      <SelectObject fill={'#b4b4b4'} width={50} height={50} />
    </NotSelectTodoWrapper>
  )
}
