import { instance } from "common/instance/instance";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title });
  },
  reorder(todoId: string, putAfterItemId: string | null) {
    /**
     * putAfterItemId: (string)
     * Target todolist will be order after this todolist.
     * If value is null, then todolist will be move to the top of the list
     * */
    return instance.put(`/todo-lists/${todoId}/reorder`, { putAfterItemId });
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