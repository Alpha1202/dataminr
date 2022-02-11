import { Router } from "express";

import { CreateNewTaskList, FetchSingleTaskList, FetchAlltaskLists, UpdateTaskList, DeleteTaskList, AddTask, RemoveTask } from "./tasklist.controller";
import { formatCreateNewTaskListPayload, validateAddTaskInputs, validateTaskListIdInputs, validatetaskListTitleInput, formatCreateAddTaskPayload } from "./taskList.middleware";

const routes = Router();

routes.post("/create", validatetaskListTitleInput, formatCreateNewTaskListPayload, CreateNewTaskList);

routes.get("/taskList/:taskList_id", FetchSingleTaskList);

routes.put("/taskList", validatetaskListTitleInput, validateTaskListIdInputs,  UpdateTaskList);

routes.delete("/taskList/:taskList_id", DeleteTaskList);

routes.get("/all", FetchAlltaskLists);

routes.post("/taskList/add/task", validateAddTaskInputs, formatCreateAddTaskPayload, AddTask);

routes.post("/taskList/remove/task", validateAddTaskInputs, RemoveTask);

export default routes;
