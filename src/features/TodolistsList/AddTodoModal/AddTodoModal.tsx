import { useForm } from 'react-hook-form'
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { ButtonAddTodo, ErrorMessage, Input } from "features/TodolistsList/AddTodoModal/styled/styled";
import { addTodolistTC } from "features/TodolistsList/todolists.slice";
import React from 'react';

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
    dispatch(addTodolistTC(data.title))
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
