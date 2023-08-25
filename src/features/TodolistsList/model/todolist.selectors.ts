import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectTodolistsBase = (state: AppRootStateType) => state.todolists;
const selectTasksBase=(state:AppRootStateType) => state.tasks

export const selectTodolists = createSelector([selectTodolistsBase],
  (todolists) => todolists.todoList
);
export const selectTasks = createSelector([selectTasksBase],
  (tasks) => tasks
);