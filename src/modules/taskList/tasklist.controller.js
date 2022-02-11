/* eslint-disable import/prefer-default-export */
import { createNewTaskList, getSingleTaskListById, getAllTaskList, deleteTaskList, updateTaskList, addTask, removeTask } from "./taskList.model";
import { getSingleTaskById } from "../task/task.model";
import { handleErrorResponse, handleSuccessResponse } from "../../helpers/utils";

export const CreateNewTaskList = async (req, res) => {
	try {
		const { successful, newTaskList = [], error } = await createNewTaskList(req.payload);
		if (successful) {
			handleSuccessResponse(res, newTaskList, 201);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};

export const FetchSingleTaskList = async (req, res) => {
	try {
		const { successful, error, foundTaskList } = await getSingleTaskListById(req.params.taskList_id);
		if (successful) {
			return handleSuccessResponse(res, foundTaskList, 200);
		}
		if (!successful && error == "TaskList not found") {
			return handleErrorResponse(res, error, 404);
		} else {
			return handleErrorResponse(res, error, 404);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const FetchAlltaskLists = async (req, res) => {
	try {
		const { successful, error, taskLists } = await getAllTaskList(req.body);
		if (successful) {
			handleSuccessResponse(res, taskLists, 200);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};

export const UpdateTaskList = async (req, res) => {
	try {
		const { successful, error, taskList } = await updateTaskList(req.body);
		if (successful) {
			return handleSuccessResponse(res, taskList, 200);
		}
		if (!successful && error == "TaskList not found") {
			return handleErrorResponse(res, error, 404);
		} else {
			return handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const DeleteTaskList = async (req, res) => {
	try {
		const { successful, error, deletedTaskList } = await deleteTaskList(req.params.taskList_id);
		if (successful) {
			handleSuccessResponse(res, deletedTaskList, 200);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};

export const AddTask = async (req, res) => {
	try {
		const { error, foundTask, successful } = await getSingleTaskById(req.payload.task_id);

		if (error) {
			return handleErrorResponse(res, error, 400);
		}
		if (successful) {
			const { successful: success, taskList = [], error: err } = await addTask(req.payload);
			if (success) {
				return handleSuccessResponse(res, taskList, 200);
			} else {
				return handleErrorResponse(res, err, 400);
			}
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const RemoveTask = async (req, res) => {
	try {
		const { error } = await getSingleTaskById(req.body.task_id);

		if (error) {
			return handleErrorResponse(res, error, 400);
		}
		const { successful: success, taskList = [], error: err } = await removeTask(req.body);
		if (success) {
			return handleSuccessResponse(res, taskList, 200);
		} else {
			return handleErrorResponse(res, err, 400);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};
