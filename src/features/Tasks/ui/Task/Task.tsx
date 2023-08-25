import { ChangeEvent } from 'react'
import { nameDate } from 'common/utils/name-date'


import React from 'react'
import { Checkbox } from "common/components";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { updateTask } from "features/Tasks/model/tasks.slice";
import { ArrowRight, TaskFlexContainer, TaskPriority, TaskPriorityFlex, TaskTitle } from "features/Tasks/ui/Task/styled/styled";
import { TaskPriorities, TaskStatuses, TaskType } from "features/Tasks/api/tasks.types";


export const priorityContent = {
  [TaskPriorities.Low]: 'Low',
  [TaskPriorities.Medium]: 'Medium',
  [TaskPriorities.High]: 'High',
}

type PropsType = {
  task: TaskType
  openEditMode: (taskId: string) => void
}

export const Task = ({ task, openEditMode }: PropsType) => {
  const dispatch = useAppDispatch()

  const handlerOpenEditMode = () => {
    openEditMode(task.id)
  }

  const handlerChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked
    const payload = {
      todoId: task.todoListId,
      taskId: task.id,
      model: { status: checked ? TaskStatuses.Completed : TaskStatuses.New },
    }

    dispatch(updateTask({taskId: payload.taskId,model: payload.model,todoId: payload.todoId }))
  }

  return (
    <>
      <TaskFlexContainer width={'35%'} colGap={'20px'}>
        <Checkbox
          id={task.id}
          disabled={false}
          checked={task.status.Completed === TaskStatuses.Completed}
          onChange={handlerChangeChecked}
        />
        <TaskTitle>{task.title}</TaskTitle>
      </TaskFlexContainer>

      <TaskFlexContainer width={'15%'}>
        <p>{nameDate(task.startDate, task.deadline)}</p>
      </TaskFlexContainer>

      <TaskPriorityFlex width={'15%'} style={{ justifyContent: 'center' }}>
        <TaskPriority priority={task.priority}>{priorityContent[task.priority]}</TaskPriority>
      </TaskPriorityFlex>

      <ArrowRight onClick={handlerOpenEditMode} />
    </>
  )
}
