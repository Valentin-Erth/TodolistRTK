export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
}

export enum TaskPriorities {
  Low = 1,
  Medium = 2,
  High = 3,
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type ResponseGetTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
}

export type UpdateModelType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}
