import { baseInstance } from "common/instance/baseInstance";

export const todolistsAPI = {
  getTodolists() {
    return baseInstance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return baseInstance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return baseInstance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return baseInstance.put<ResponseType>(`todo-lists/${id}`, { title: title });
  },
  reorder(todoId: string, putAfterItemId: string | null) {
    /**
     * putAfterItemId: (string)
     * Target todolist will be order after this todolist.
     * If value is null, then todolist will be move to the top of the list
     * */
    return baseInstance.put(`/todo-lists/${todoId}/reorder`, { putAfterItemId });
  }
};
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