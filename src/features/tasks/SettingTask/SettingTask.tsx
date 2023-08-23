import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { formatterDate } from 'common/utils/formatter-date'


import { ButtonGroup, DataPicker } from "components";
import React from 'react'
import { useAppDispatch } from "common/hooks/useAppDispatch";
import {
  ButtonDelete, ButtonSave,
  ButtonWrapper,
  CloseIcon,
  FormContentWrapper,
  FormWrapper,
  InputSetting, PickerWrapper,
  TaskTitle, TextAreaSetting,
  TitleWrapper
} from "./styled/styled";
import { removeTask, updateTask } from "features/tasks/tasks.slice";
import { TaskPriorities, TaskType } from "features/tasks/tasksTypes";

type PropsType = {
  task: TaskType
  closeEditMode: () => void
}
type FormData = {
  title: string
  description: string
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export const SettingTask = ({ task, closeEditMode }: PropsType) => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  useEffect(() => {
    setValue('title', task.title)
    setValue('description', task.description)
    setValue('priority', task.priority)
    setValue('startDate', task.startDate ? formatterDate(task.startDate) : '')
    setValue('deadline', task.deadline ? formatterDate(task.deadline) : '')
  }, [task])

  const onSubmit = (data: FormData) => {
    dispatch(updateTask({ todoId: task.todoListId, taskId: task.id, model: data }))
    closeEditMode()
  }

  const handlerDeleteTask = () => {
    dispatch(removeTask({taskId: task.id, todolistId:task.todoListId }))
    closeEditMode()
  }
  const handlerStartDate = (date: string) => setValue('startDate', date)
  const handlerDeadlineDate = (date: string) => setValue('deadline', date)
  const handlerChangeRadio = (value: TaskPriorities) => {
    setValue('priority', value)
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormContentWrapper>
        <TitleWrapper>
          <TaskTitle>Task:</TaskTitle>
          <CloseIcon type={'button'} onClick={closeEditMode} />
        </TitleWrapper>

        <InputSetting {...register('title')} placeholder={task.title} />
        <TextAreaSetting {...register('description')} placeholder={'Description'} />

        <PickerWrapper>
          <p>Start Date: {watch('startDate')}</p>
          <DataPicker onChange={handlerStartDate} />
        </PickerWrapper>
        <PickerWrapper>
          <p>Deadline: {watch('deadline')}</p>
          <DataPicker onChange={handlerDeadlineDate} />
        </PickerWrapper>

        <PickerWrapper>
          <p>Priority:</p>
          <ButtonGroup value={watch('priority')} onChange={handlerChangeRadio} />
        </PickerWrapper>
      </FormContentWrapper>

      <ButtonWrapper>
        <ButtonDelete type={'button'} onClick={handlerDeleteTask}>
          Delete Task
        </ButtonDelete>
        <ButtonSave type={'submit'}>Save changes</ButtonSave>
      </ButtonWrapper>
    </FormWrapper>
  )
}
