/* eslint-disable eqeqeq */
import { Op } from "sequelize";
import { Task, Sequelize } from "../../db/models";

export const createNewTask = async (payload) => {
	try {
		const newTask = await Task.create(payload);
		return { newTask, successful: true };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const updateTask = async (payload) => {
	try {
		const { foundTask } = await getSingleTaskById(payload.task_id);
		if (foundTask) {
			const updatedTask = await Task.update(payload, { where: { task_id: payload.task_id } });
			if (updatedTask != 0) {
				const { foundTask: task } = await getSingleTaskById(payload.task_id);
				return { task, successful: true };
			} else {
				return { error, successful: false };
			}
		} else {
			return { error: "Task not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Task not found or invalid task id", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const deleteTask = async (payload) => {
	try {
		const { foundTask } = await getSingleTaskById(payload);
		if (foundTask) {
			const response = await Task.destroy({ where: { task_id: payload } });
			if (response) {
				return { deletedTask: [], successful: true };
			} else {
				return { error, successful: false };
			}
		} else {
			return { error: "Task not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Task not found or invalid task id", successful: false };
		}

		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const getSingleTaskById = async (payload) => {
	try {
		const foundTask = await Task.findOne({
			where: { task_id: payload },
		});
		if (foundTask) {
			return { foundTask, successful: true };
		} else {
			return { error: "Task not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Task not found or invalid task id", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const getAllTasks = async (payload) => {
	try {
		const tasks = await Task.findAndCountAll({
			offset: payload.offset,
			limit: payload.limit,
			distinct: true,
		});
		if (tasks) {
			return { tasks, successful: true };
		}
		const error = "No Task found";
		return { error, successful: false };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};
