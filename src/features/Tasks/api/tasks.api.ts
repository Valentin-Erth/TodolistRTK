import { ResponseGetTasksType, ResponseType, TaskType, UpdateModelType } from "features/Tasks/api/tasks.types";
import { baseInstance } from "common/instance/baseInstance";

export const tasksAPI = {
  getTasks(todolistId: string) {
    return baseInstance.get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return baseInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, taskTitile: string) {
    return baseInstance.post<ResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitile});
  },
  updateTask(todolistId: string, taskId: string, model: UpdateModelType) {
    return baseInstance.put<ResponseType<{ item:TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  reorderTask(todoId: string, taskId: string, putAfterItemId: string | null) {
    /**
     * putAfterItemId: (string)
     * Target todolist will be order after this todolist.
     * If value is null, then todolist will be move to the top of the list
     * */
    return baseInstance.put(`/todo-lists/${todoId}/tasks/${taskId}/reorder`, { putAfterItemId })
  },
}