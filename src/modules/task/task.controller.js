/* eslint-disable import/prefer-default-export */
import { createNewTask, getSingleTaskById, getAllTasks, updateTask, deleteTask } from "./task.model";
import { handleErrorResponse, handleSuccessResponse } from "../../helpers/utils";

export const CreateNewTask = async (req, res) => {
	try {
		const { successful, newTask = [], error } = await createNewTask(req.payload);
		if (successful) {
			handleSuccessResponse(res, newTask, 201);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};

export const FetchSingleTask = async (req, res) => {
	try {
		const { successful, error, foundTask } = await getSingleTaskById(req.params.task_id);
		if (successful) {
			return handleSuccessResponse(res, foundTask, 200);
		}
		if (!successful && error == "Task not found") {
			return handleErrorResponse(res, error, 404);
		} else {
			return handleErrorResponse(res, error, 404);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const FetchAlltasks = async (req, res) => {
	try {
		const { successful, error, tasks } = await getAllTasks(req.body);
		if (successful) {
			handleSuccessResponse(res, tasks, 200);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};

export const UpdateTask = async (req, res) => {
	try {
		const { successful, error, task } = await updateTask(req.body);
		if (successful) {
			return handleSuccessResponse(res, task, 200);
		}
		if (!successful && error == "Task not found") {
			return handleErrorResponse(res, error, 404);
		} else {
			return handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const DeleteTask = async (req, res) => {
	try {
		const { successful, error, deletedTask } = await deleteTask(req.params.task_id);
		if (successful) {
			handleSuccessResponse(res, deletedTask, 200);
		} else {
			handleErrorResponse(res, error, 400);
		}
	} catch (error) {
		handleErrorResponse(res, error, 500);
	}
};
