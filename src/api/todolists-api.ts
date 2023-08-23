import axios from 'axios'
import { ResponseGetTasksType, UpdateModelType } from "features/tasks/tasksTypes";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
        return promise;
    },
    reorder(todoId: string, putAfterItemId: string | null) {
        /**
         * putAfterItemId: (string)
         * Target todolist will be order after this todolist.
         * If value is null, then todolist will be move to the top of the list
         * */
        return instance.put(`/todo-lists/${todoId}/reorder`, { putAfterItemId })
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitile: string) {
        return instance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateModelType) {
        return instance.put<ResponseType<{ item:TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    reorderTask(todoId: string, taskId: string, putAfterItemId: string | null) {
        /**
         * putAfterItemId: (string)
         * Target todolist will be order after this todolist.
         * If value is null, then todolist will be move to the top of the list
         * */
        return instance.put(`/todo-lists/${todoId}/tasks/${taskId}/reorder`, { putAfterItemId })
    },
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{userId?: number}>>('auth/login', data);
        return promise;
    },
    logout() {
        const promise = instance.delete<ResponseType<{userId?: number}>>('auth/login');
        return promise;
    },
    me() {
       const promise =  instance.get<ResponseType<{id: number; email: string; login: string}>>('auth/me');
       return promise
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
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
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
