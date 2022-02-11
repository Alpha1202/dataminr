import { uuidGenerator } from "../../helpers/utils";
import { handleErrorResponse } from "../../helpers/utils";

export const formatCreateNewTaskListPayload = (req, res, next) => {
	const payload = {
		taskList_id: uuidGenerator(),
		...req.body,
	};
	req.payload = payload;
	return next();
};

export const formatCreateAddTaskPayload = (req, res, next) => {
	const payload = {
		taskListTask_id: uuidGenerator(),
		...req.body,
	};
	req.payload = payload;
	return next();
};

export const validatetaskListTitleInput = (req, res, next) => {
  if(!req.body.title) return handleErrorResponse(res, 'Task list title is required', 400);
	return next();
};


export const validateTaskListIdInputs = (req, res, next) => {
  if(!req.body.taskList_id) return handleErrorResponse(res, 'Task list ID is required', 400);
	return next();
};

export const validateAddTaskInputs = (req, res, next) => {
  if(!req.body.task_id) return handleErrorResponse(res, 'Task ID is required', 400);
  if(!req.body.taskList_id) return handleErrorResponse(res, 'Task list ID is required', 400);
	return next();
};
