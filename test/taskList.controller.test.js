import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import dotenv from "dotenv";
import sinon from "sinon";
import { assert } from "@sinonjs/referee";

import app from "../src/app";

import * as taskLists from "../src/modules/taskList/taskList.model";
import * as tasks from "../src/modules/task/task.model";

dotenv.config();

chai.use(chaiHttp);
chai.should();

const newTaskListObj = {
	title: "new test title",
};

describe("TaskList Controller", () => {
	describe("Create task list", () => {
		it("should create a new task list", (done) => {
			const createNewTaskListMock = sinon.stub(taskLists, "createNewTaskList").resolves(Promise.resolve({ successful: true, newTaskList: {} }));

			chai
				.request(app)
				.post("/api/v1/taskLists/create")
				.send(newTaskListObj)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("object");
					sinon.assert.called(createNewTaskListMock);
					createNewTaskListMock.restore();
					done();
				});
		});

		it("should not create a new task list when title is missing", (done) => {
			const newTaskListObj = {
				title: "",
			};
			chai
				.request(app)
				.post("/api/v1/taskLists/create")
				.send(newTaskListObj)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("Task list title is required");
					done();
				});
		});

		it("should return 400 error", (done) => {
			const createNewTaskListMock = sinon.stub(taskLists, "createNewTaskList").resolves(Promise.resolve({ successful: false, error: "some error" }));
			chai
				.request(app)
				.post("/api/v1/taskLists/create")
				.send(newTaskListObj)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some error");
					createNewTaskListMock.restore();
					done();
				});
		});

		it("should return 500 error", (done) => {
			const createNewTaskListMock = sinon.stub(taskLists, "createNewTaskList").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.post("/api/v1/taskLists/create")
				.send(newTaskListObj)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					createNewTaskListMock.restore();
					done();
				});
		});
	});

	describe("Fetch single task list", () => {
		it("should fetch a single task list", (done) => {
			const createNewTaskListMock = sinon.stub(taskLists, "getSingleTaskListById").resolves(Promise.resolve({ successful: true, foundTaskList: [] }));
			chai
				.request(app)
				.get(`/api/v1/taskLists/taskList/1`)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(200);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("array");
					sinon.assert.called(createNewTaskListMock);
					createNewTaskListMock.restore();
					done();
				});
		});

		it("should return 404 if task does not exist", (done) => {
			const createNewTaskListMock = sinon
				.stub(taskLists, "getSingleTaskListById")
				.resolves(Promise.resolve({ successful: false, error: "TaskList not found" }));
			chai
				.request(app)
				.get(`/api/v1/taskLists/taskList/1`)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(404);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("TaskList not found");
					createNewTaskListMock.restore();
					done();
				});
		});

		it("should return 404 if unsuccessful with any other error type", (done) => {
			const createNewTaskListMock = sinon
				.stub(taskLists, "getSingleTaskListById")
				.resolves(Promise.resolve({ successful: false, error: "some other error types" }));
			chai
				.request(app)
				.get(`/api/v1/taskLists/taskList/1`)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(404);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some other error types");
					createNewTaskListMock.restore();
					done();
				});
		});

		it("should return 500", (done) => {
			const createNewTaskListMock = sinon.stub(taskLists, "getSingleTaskListById").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.get(`/api/v1/taskLists/taskList/1`)
				.end((err, res) => {
					sinon.assert.called(createNewTaskListMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					createNewTaskListMock.restore();
					done();
				});
		});
	});

	describe("Fetch All task list", () => {
		it("should fetch all task list", (done) => {
			const fetchAllTaskListMock = sinon.stub(taskLists, "getAllTaskList").resolves(Promise.resolve({ successful: true, taskLists: [] }));
			chai
				.request(app)
				.get(`/api/v1/taskLists/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskListMock);
					res.should.have.status(200);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("array");
					fetchAllTaskListMock.restore();
					done();
				});
		});

		it("should return 400 error", (done) => {
			const fetchAllTaskListMock = sinon.stub(taskLists, "getAllTaskList").resolves(Promise.resolve({ successful: false, error: "some error" }));
			chai
				.request(app)
				.get(`/api/v1/taskLists/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskListMock);
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some error");
					fetchAllTaskListMock.restore();
					done();
				});
		});
		it("should return 500", (done) => {
			const fetchAllTaskListMock = sinon.stub(taskLists, "getAllTaskList").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.get(`/api/v1/taskLists/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskListMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					fetchAllTaskListMock.restore();
					done();
				});
		});

		describe("Update task list", () => {
			it("should update task list", (done) => {
				const newTaskObj = {
					taskList_id: "1",
					title: "new",
				};
				const updateTaskListMock = sinon.stub(taskLists, "updateTaskList").resolves(Promise.resolve({ successful: true, taskList: [] }));
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskListMock);
						res.should.have.status(200);
						res.body.status.should.be.a("string").eql("success");
						res.body.data.should.be.an("array");
						updateTaskListMock.restore();
						done();
					});
			});

			it("should not update a task list id when task id is missing", (done) => {
				const newTaskObj = {
					taskList_id: "",
					title: "new",
				};
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("Task list ID is required");
						done();
					});
			});

			it("should not update a tast list title when title is missing", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "",
				};
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("Task list title is required");
						done();
					});
			});

			it("should return 404 if tasklist  does not exist", (done) => {
				const newTaskObj = {
					taskList_id: "1",
					title: "new",
				};
				const updateTaskListMock = sinon.stub(taskLists, "updateTaskList").resolves(Promise.resolve({ successful: false, error: "TaskList not found" }));
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskListMock);
						res.should.have.status(404);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("TaskList not found");
						updateTaskListMock.restore();
						done();
					});
			});

			it("should return 400", (done) => {
				const newTaskObj = {
					taskList_id: "1",
					title: "new",
				};
				const updateTaskListMock = sinon.stub(taskLists, "updateTaskList").resolves(Promise.resolve({ successful: false, error: "some other error" }));
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskListMock);
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("some other error");
						updateTaskListMock.restore();
						done();
					});
			});

			it("should return 500", (done) => {
				const newTaskObj = {
					taskList_id: "1",
					title: "new",
				};
				const updateTaskListMock = sinon.stub(taskLists, "updateTaskList").throws({ successful: false, error: "some server error" });
				chai
					.request(app)
					.put(`/api/v1/taskLists/taskList`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskListMock);
						res.should.have.status(500);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.error.should.be.a("string").eql("some server error");
						updateTaskListMock.restore();
						done();
					});
			});

			describe("Delete task list", () => {
				it("should delete task list", (done) => {
					const deleteTaskListMock = sinon.stub(taskLists, "deleteTaskList").resolves(Promise.resolve({ successful: true, deletedTaskList: [] }));
					chai
						.request(app)
						.delete(`/api/v1/taskLists/taskList/:taskList_id`)
						.end((err, res) => {
							sinon.assert.called(deleteTaskListMock);
							res.should.have.status(200);
							res.body.status.should.be.a("string").eql("success");
							res.body.data.should.be.an("array");
							deleteTaskListMock.restore();
							done();
						});
				});

				it("should return 400", (done) => {
					const deleteTaskListMock = sinon.stub(taskLists, "deleteTaskList").resolves(Promise.resolve({ successful: false, error: "some error" }));
					chai
						.request(app)
						.delete(`/api/v1/taskLists/taskList/:taskList_id`)
						.end((err, res) => {
							sinon.assert.called(deleteTaskListMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("some error");
							deleteTaskListMock.restore();
							done();
						});
				});
				it("should return 500", (done) => {
					const deleteTaskListMock = sinon.stub(taskLists, "deleteTaskList").throws({ successful: false, error: "some server error" });
					chai
						.request(app)
						.delete(`/api/v1/taskLists/taskList/:taskList_id`)
						.end((err, res) => {
							sinon.assert.called(deleteTaskListMock);
							res.should.have.status(500);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.error.should.be.a("string").eql("some server error");
							deleteTaskListMock.restore();
							done();
						});
				});
			});

			describe("add new task to task list", () => {
				const addTaskObj = {
					task_id: "1",
					taskList_id: "2",
				};
				it("should check if task exists does not exist", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: "Tasklist not found or invalid tasklist id" }));
					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/add/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(getSingleTaskMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("Tasklist not found or invalid tasklist id");
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should call addTask if task exists", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const addTaskMock = sinon.stub(taskLists, "addTask").resolves(Promise.resolve({ successful: true, taskList: [] }));

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/add/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(addTaskMock);
							res.should.have.status(200);
							res.body.status.should.be.a("string").eql("success");
							res.body.data.should.be.an("array");
							addTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should call addTask if task exists but return a 400 error if anything went wrong", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const addTaskMock = sinon.stub(taskLists, "addTask").resolves(Promise.resolve({ successful: false, error: "some error" }));

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/add/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(addTaskMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("some error");
							addTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should throw an error and return 500", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const addTaskMock = sinon.stub(taskLists, "addTask").throws({ successful: false, error: "some server error" });

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/add/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(addTaskMock);
							res.should.have.status(500);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.error.should.be.a("string").eql("some server error");
							addTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});
			});
			describe("remove task from task list", () => {
				const addTaskObj = {
					task_id: "1",
					taskList_id: "2",
				};
				it("should check if task exists does not exist", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: "Tasklist not found or invalid tasklist id" }));
					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/remove/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(getSingleTaskMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("Tasklist not found or invalid tasklist id");
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should call removeTask if task exists", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const removeTaskMock = sinon.stub(taskLists, "removeTask").resolves(Promise.resolve({ successful: true, taskList: [] }));

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/remove/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(removeTaskMock);
							res.should.have.status(200);
							res.body.status.should.be.a("string").eql("success");
							res.body.data.should.be.an("array");
							removeTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should call removeTask if task exists but return a 400 error if anything went wrong", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const removeTaskMock = sinon.stub(taskLists, "removeTask").resolves(Promise.resolve({ successful: false, error: "some error" }));

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/remove/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(removeTaskMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("some error");
							removeTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});

				it("should throw an error and return 500", (done) => {
					const getSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ error: false, foundTask: [], successful: true }));
					const removeTaskMock = sinon.stub(taskLists, "removeTask").throws({ successful: false, error: "some server error" });

					chai
						.request(app)
						.post(`/api/v1/taskLists/taskList/remove/task`)
						.send(addTaskObj)
						.end((err, res) => {
							sinon.assert.called(removeTaskMock);
							res.should.have.status(500);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.error.should.be.a("string").eql("some server error");
							removeTaskMock.restore();
							getSingleTaskMock.restore();
							done();
						});
				});
			});
		});
	});
});
