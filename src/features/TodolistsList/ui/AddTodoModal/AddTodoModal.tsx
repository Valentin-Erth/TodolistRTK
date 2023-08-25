import { useForm } from 'react-hook-form'
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { ButtonAddTodo, ErrorMessage, Input } from "features/TodolistsList/ui/AddTodoModal/styled/styled";

import React from 'react';
import { todolistsThunks } from "features/TodolistsList/model/todolists.slice";

const validateSchema = {
  minLength: 1,
  required: true,
  maxLength: 90,
}

type PropsType = {
  setShow: (show: boolean) => void
}
type FormData = {
  title: string
}

export const AddTodoModal = ({ setShow }: PropsType) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(data => {
    dispatch(todolistsThunks.addTodolist(data.title))
    setShow(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Input placeholder={'title project'} {...register('title', validateSchema)} />
      {errors.title && <ErrorMessage>{errors.title.type}</ErrorMessage>}
      <ButtonAddTodo type={'submit'}>add project</ButtonAddTodo>
    </form>
  )
}
