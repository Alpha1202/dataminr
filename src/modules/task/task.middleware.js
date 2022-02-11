import { uuidGenerator } from "../../helpers/utils";
import { handleErrorResponse } from "../../helpers/utils";

export const formatCreateNewTaskPayload = (req, res, next) => {
	const payload = {
		task_id: uuidGenerator(),
		...req.body,
	};
	req.payload = payload;
	return next();
};

export const validatetaskTitleInput = (req, res, next) => {
  if(!req.body.title) return handleErrorResponse(res, 'Task title is required', 400);
	return next();
};


export const validateTaskIdInputs = (req, res, next) => {
  if(!req.body.task_id) return handleErrorResponse(res, 'Task ID is required', 400);
	return next();
};