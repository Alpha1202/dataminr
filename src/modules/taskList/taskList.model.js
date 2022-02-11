/* eslint-disable eqeqeq */
import { Op } from "sequelize";
import { TaskList, Task, TaskListTask, Sequelize } from "../../db/models";

export const createNewTaskList = async (payload) => {
	try {
		const newTaskList = await TaskList.create(payload);
		return { newTaskList, successful: true };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const getSingleTaskListById = async (payload) => {
	try {
		const foundTaskList = await TaskList.findOne({
			where: { taskList_id: payload },
			attributes: ['taskList_id', 'title', 'createdAt', 'updatedAt' ],
			include: {
				model: Task,  attributes: ['task_id', 'title', 'createdAt', 'updatedAt'], through: {attributes: []}
			},
			
		});
		if (foundTaskList) {
			return { foundTaskList, successful: true };
		} else {
			return { error: "TaskList not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Tasklist not found or invalid tasklist id", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const getAllTaskList = async (payload) => {
	try {
		const taskLists = await TaskList.findAndCountAll({
			offset: payload.offset,
			limit: payload.limit,
			distinct: true,
			attributes: ['taskList_id', 'title', 'createdAt', 'updatedAt' ],
			include: {
				model: Task,  attributes: ['task_id', 'title', 'createdAt', 'updatedAt'], through: {attributes: []}
			},
		});
		if (taskLists) {
			return { taskLists, successful: true };
		}
		const error = "No TaskLists found";
		return { error, successful: false };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const updateTaskList = async (payload) => {
	try {
		const { foundTaskList } = await getSingleTaskListById(payload.taskList_id);
		if (foundTaskList) {
			const updatedTaskList = await TaskList.update(payload, { where: { taskList_id: payload.taskList_id } });
			if (updatedTaskList != 0) {
				const { foundTaskList: taskList } = await getSingleTaskListById(payload.taskList_id);
				return { taskList, successful: true };
			} else {
				return { error, successful: false };
			}
		}else {
			return { error: "TaskList not found", successful: false };
		}
		
	
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Task list not found or invalid task list id", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const deleteTaskList = async (payload) => {
	try {
		const { error: err } = await getSingleTaskListById(payload);
		if (!err) {
			const response = await TaskList.destroy({ where: { taskList_id: payload } });
			if(response) {
				return { deletedTaskList: [], successful: true };
			} else {
				return { error, successful: false };
			}
		} else {
			return { error: "Task list not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "Task list not found or invalid task list id", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const addTask = async (payload) => {
	try {
		const { error } = await getSingleTaskListById(payload.taskList_id);
		if (error) {
			return { error, successful: false };
		}
		
		const obj = {
			taskListTask_id: payload.taskListTask_id,
			task_id: payload.task_id,
			taskList_id: payload.taskList_id,
		};
		const { successful, newTaskListTask, error: err } = await createNewTaskListTask(obj);
		if (successful) {
			const { successful: success, error: e, foundTaskList: taskList } = await getSingleTaskListById(payload.taskList_id);

			if (success) {
				return { taskList, successful: true };
			} else {
				return { e, successful: false };
			}
		} else {
			return { err, successful: false };
		}
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const createNewTaskListTask = async (payload) => {
	try {
		const newTaskListTask = await TaskListTask.create(payload);
		
		return { newTaskListTask, successful: true };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};
export const removeTask = async (payload) => {
	try {
		const { error } = await getSingleTaskListById(payload.taskList_id);
		if (error) {
			return { error, successful: false };
		}
		const response = await TaskListTask.destroy({ where: {
			[Op.and]: [{ task_id: payload.task_id}, { taskList_id: payload.taskList_id}]
			 } });
		if (response) {
			const { successful: success, error, foundTaskList: taskList } = await getSingleTaskListById(payload.taskList_id);
			if (success) {
				return { taskList, successful: true };
			} else {
				return { error, successful: false };
			}
		} else {
			return { error, successful: false };
		}
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};


