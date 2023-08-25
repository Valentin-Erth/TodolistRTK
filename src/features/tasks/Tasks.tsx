import { useEffect, useState } from 'react'

import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
  AddNewTaskWrapper,
  AddTaskButton,
  AddTaskIcon,
  InputAddTask,
  TasksContent,
  TasksTitle,
  TasksWrapper,
} from './styled/styled'


import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectTodolists } from "features/TodolistsList/todolist.selectors";
import { TaskWrapper } from "features/tasks/Task/styled/styled";
import { Task } from "features/tasks/Task/Task";
import React from 'react'
import { addTask, changeOrderTaskTC, ChangeOrderTaskType,tasksThunks } from "features/tasks/tasks.slice";
import { EmptyTaskList } from "features/tasks/EmptyTaskList/EmptyTaskList";
import { SettingTask } from "features/tasks/SettingTask/SettingTask";
import { selectTasks } from "features/tasks/tasksSelectors";

const validateSchema = {
  minLength: 1,
  required: true,
  maxLength: 90,
}

export const Tasks = () => {
  const { todoId } = useParams()
  const tasks = useAppSelector(selectTasks)
  // console.log('tasks',tasks);
  const todo = useAppSelector(selectTodolists).find(el => el.id === todoId)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>({
    mode: 'onBlur',
  })

  const [editMode, setEditMode] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)
   const currentTask = tasks.find((el:any) => el.id === taskId)


  useEffect(() => {
    if (!todoId) return

    dispatch(tasksThunks.fetchTasks(todoId))
  }, [todoId])

  const handlerOpenEditMode = (taskId: string) => {
    setEditMode(true)
    setTaskId(taskId)
  }
  const handlerCloseEditMode = () => {
    setEditMode(false)
    setTaskId(null)
  }
  const handlerDragEnd = (result: DropResult) => {
    if (!result.destination || !todoId) return

    const payload: ChangeOrderTaskType = {
      todoId: todoId,
      taskId: result.draggableId,
      newTaskIndex: result.destination.index,
      oldTaskIndex: result.source.index,
    }

    dispatch(changeOrderTaskTC(payload))
  }

  const onSubmit = (data: { title: string }) => {
    if (!todoId) return
    dispatch(addTask({title: data.title, todoId }))
    reset()
  }

  const TasksJSX =tasks.map((el:any, index:number) => (
    <Draggable key={el.id} draggableId={el.id} index={index}>
      {provided => (
        <TaskWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
        >
          <Task task={el} openEditMode={handlerOpenEditMode} />
        </TaskWrapper>
      )}
    </Draggable>
  ))

  return (
    <TasksWrapper>
      <TasksContent>
        <TasksTitle>{todo && todo.title}</TasksTitle>

        <AddNewTaskWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputAddTask placeholder={'Add New Task'} {...register('title', validateSchema)} />
          <AddTaskButton type={'submit'}>
            <AddTaskIcon />
          </AddTaskButton>
        </AddNewTaskWrapper>

        {!!tasks.length && (
          <DragDropContext onDragEnd={handlerDragEnd}>
            <Droppable direction={'vertical'} droppableId={'todoArea'}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {TasksJSX}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {!tasks.length && <EmptyTaskList />}
      </TasksContent>

      {editMode && currentTask && (
        <SettingTask task={currentTask} closeEditMode={handlerCloseEditMode} />
      )}
    </TasksWrapper>
  )
}
