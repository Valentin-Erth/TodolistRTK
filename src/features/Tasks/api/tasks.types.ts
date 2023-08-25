
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}
export const TaskStatuses= {
  New : 0,
  InProgress : 1,
  Completed : 2,
} as const

export enum TaskPriorities {
  Low = 1,
  Medium = 2,
  High = 3,
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status:typeof TaskStatuses
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
  status: number | typeof TaskStatuses
  priority: number
  startDate: string
  deadline: string
}
