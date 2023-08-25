import { ChangeEvent, useState } from 'react'


import {
  ButtonDelete,
  ButtonSave,
  ButtonWrapper,
  Input,
} from 'features/TodolistsList/ui/EditTodoModal/styled/styled'

import { useAppDispatch } from "common/hooks/useAppDispatch";
import { todolistsThunks } from "features/TodolistsList/model/todolists.slice";
import React from 'react';

type PropsType = {
  id: string
  title: string
  closeModal: (value: boolean) => void
}

export const EditTodoModal = ({ title, id, closeModal }: PropsType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(title)

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handlerSaveChanges = () => {
    dispatch(todolistsThunks.changeTodolistTitle({ id,title: value }))
    closeModal(false)
  }
  const handlerDeleteTodo = () => {
    dispatch(todolistsThunks.removeTodolist({ todolistId:id }))
    closeModal(false)
  }

  return (
    <>
      <Input value={value} onChange={handlerChange} />
      <ButtonWrapper>
        <ButtonDelete onClick={handlerDeleteTodo}>delete</ButtonDelete>
        <ButtonSave onClick={handlerSaveChanges}>save</ButtonSave>
      </ButtonWrapper>
    </>
  )
}
