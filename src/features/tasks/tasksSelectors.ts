import { AppRootStateType } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectTasksBase=(state:AppRootStateType) => state.tasks
export const selectTasks = createSelector([selectTasksBase],
  (tasks) => tasks.taskList
);
