import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import dotenv from "dotenv";
import sinon from "sinon";
import { assert } from "@sinonjs/referee";

import app from "../src/app";

import * as tasks from "../src/modules/task/task.model";

dotenv.config();

chai.use(chaiHttp);
chai.should();

const newTaskObj = {
	title: "new test title",
};

describe("Task Controller", () => {
	describe("Create task", () => {
		it("should create a new task", (done) => {
			const createNewTaskMock = sinon.stub(tasks, "createNewTask").resolves(Promise.resolve({ successful: true, newTask: {} }));

			chai
				.request(app)
				.post("/api/v1/tasks/create")
				.send(newTaskObj)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("object");
					sinon.assert.called(createNewTaskMock);
					createNewTaskMock.restore();
					done();
				});
		});

		it("should not create a new task when title is missing", (done) => {
			const newTaskObj = {
				title: "",
			};
			chai
				.request(app)
				.post("/api/v1/tasks/create")
				.send(newTaskObj)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("Task title is required");
					done();
				});
		});

		it("should return 400 error", (done) => {
			const createNewTaskMock = sinon.stub(tasks, "createNewTask").resolves(Promise.resolve({ successful: false, error: "some error" }));
			chai
				.request(app)
				.post("/api/v1/tasks/create")
				.send(newTaskObj)
				.end((err, res) => {
					sinon.assert.called(createNewTaskMock);
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some error");
					createNewTaskMock.restore();
					done();
				});
		});

		it("should return 500 error", (done) => {
			const createNewTaskMock = sinon.stub(tasks, "createNewTask").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.post("/api/v1/tasks/create")
				.send(newTaskObj)
				.end((err, res) => {
					sinon.assert.called(createNewTaskMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					createNewTaskMock.restore();
					done();
				});
		});
	});

	describe("Fetch single task", () => {
		it("should fetch a single task", (done) => {
			const fetchSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ successful: true, foundTask: [] }));
			chai
				.request(app)
				.get(`/api/v1/tasks/task/1`)
				.end((err, res) => {
					sinon.assert.called(fetchSingleTaskMock);
					res.should.have.status(200);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("array");
					sinon.assert.called(fetchSingleTaskMock);
					fetchSingleTaskMock.restore();
					done();
				});
		});

		it("should return 404 if task does not exist", (done) => {
			const fetchSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ successful: false, error: "Task not found" }));
			chai
				.request(app)
				.get(`/api/v1/tasks/task/1`)
				.end((err, res) => {
					sinon.assert.called(fetchSingleTaskMock);
					res.should.have.status(404);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("Task not found");
					fetchSingleTaskMock.restore();
					done();
				});
		});

		it("should return 404 if unsuccessful with any other error type", (done) => {
			const fetchSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").resolves(Promise.resolve({ successful: false, error: "some other error types" }));
			chai
				.request(app)
				.get(`/api/v1/tasks/task/1`)
				.end((err, res) => {
					sinon.assert.called(fetchSingleTaskMock);
					res.should.have.status(404);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some other error types");
					fetchSingleTaskMock.restore();
					done();
				});
		});

		it("should return 500", (done) => {
			const fetchSingleTaskMock = sinon.stub(tasks, "getSingleTaskById").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.get(`/api/v1/tasks/task/1`)
				.end((err, res) => {
					sinon.assert.called(fetchSingleTaskMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					fetchSingleTaskMock.restore();
					done();
				});
		});
	});

	describe("Fetch All task", () => {
		it("should fetch all task", (done) => {
			const fetchAllTaskMock = sinon.stub(tasks, "getAllTasks").resolves(Promise.resolve({ successful: true, tasks: [] }));
			chai
				.request(app)
				.get(`/api/v1/tasks/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskMock);
					res.should.have.status(200);
					res.body.status.should.be.a("string").eql("success");
					res.body.data.should.be.an("array");
					fetchAllTaskMock.restore();
					done();
				});
		});

		it("should return 400 error", (done) => {
			const fetchAllTaskMock = sinon.stub(tasks, "getAllTasks").resolves(Promise.resolve({ successful: false, error: "some error" }));
			chai
				.request(app)
				.get(`/api/v1/tasks/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskMock);
					res.should.have.status(400);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.should.be.a("string").eql("some error");
					fetchAllTaskMock.restore();
					done();
				});
		});
		it("should return 500", (done) => {
			const fetchAllTaskMock = sinon.stub(tasks, "getAllTasks").throws({ successful: false, error: "some server error" });
			chai
				.request(app)
				.get(`/api/v1/tasks/all`)
				.end((err, res) => {
					sinon.assert.called(fetchAllTaskMock);
					res.should.have.status(500);
					res.body.status.should.be.a("string").eql("Request Failed");
					res.body.error.error.should.be.a("string").eql("some server error");
					fetchAllTaskMock.restore();
					done();
				});
		});

		describe("Update task", () => {
			it("should update task", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "new",
				};
				const updateTaskMock = sinon.stub(tasks, "updateTask").resolves(Promise.resolve({ successful: true, task: [] }));
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskMock);
						res.should.have.status(200);
						res.body.status.should.be.a("string").eql("success");
						res.body.data.should.be.an("array");
						updateTaskMock.restore();
						done();
					});
			});

			it("should not update a task id when task id is missing", (done) => {
				const newTaskObj = {
					task_id: "",
					title: "new",
				};
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("Task ID is required");
						done();
					});
			});

			it("should not update a title when title is missing", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "",
				};
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("Task title is required");
						done();
					});
			});

			it("should return 404 if task does not exist", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "new",
				};
				const updateTaskMock = sinon.stub(tasks, "updateTask").resolves(Promise.resolve({ successful: false, error: "Task not found" }));
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskMock);
						res.should.have.status(404);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("Task not found");
						updateTaskMock.restore();
						done();
					});
			});

			it("should return 400", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "new",
				};
				const updateTaskMock = sinon.stub(tasks, "updateTask").resolves(Promise.resolve({ successful: false, error: "some other error" }));
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskMock);
						res.should.have.status(400);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.should.be.a("string").eql("some other error");
						updateTaskMock.restore();
						done();
					});
			});

			it("should return 500", (done) => {
				const newTaskObj = {
					task_id: "1",
					title: "new",
				};
				const updateTaskMock = sinon.stub(tasks, "updateTask").throws({ successful: false, error: "some server error" });
				chai
					.request(app)
					.put(`/api/v1/tasks/task`)
					.send(newTaskObj)
					.end((err, res) => {
						sinon.assert.called(updateTaskMock);
						res.should.have.status(500);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.error.should.be.a("string").eql("some server error");
						updateTaskMock.restore();
						done();
					});
			});

			describe("Delete task", () => {
				it("should delete task", (done) => {
					const deleteTaskMock = sinon.stub(tasks, "deleteTask").resolves(Promise.resolve({ successful: true, deletedTask: [] }));
					chai
						.request(app)
						.delete(`/api/v1/tasks/task/:task_id`)
						.end((err, res) => {
							sinon.assert.called(deleteTaskMock);
							res.should.have.status(200);
							res.body.status.should.be.a("string").eql("success");
							res.body.data.should.be.an("array");
							deleteTaskMock.restore();
							done();
						});
				});

				it("should return 400", (done) => {
					const deleteTaskMock = sinon.stub(tasks, "deleteTask").resolves(Promise.resolve({ successful: false, error: "some error" }));
					chai
						.request(app)
						.delete(`/api/v1/tasks/task/:task_id`)
						.end((err, res) => {
							sinon.assert.called(deleteTaskMock);
							res.should.have.status(400);
							res.body.status.should.be.a("string").eql("Request Failed");
							res.body.error.should.be.a("string").eql("some error");
							deleteTaskMock.restore();
							done();
						});
				});
			});

			it("should return 500", (done) => {
				const deleteTaskMock = sinon.stub(tasks, "deleteTask").throws({ successful: false, error: "some server error" });
				chai
					.request(app)
					.delete(`/api/v1/tasks/task/:task_id`)
					.end((err, res) => {
						sinon.assert.called(deleteTaskMock);
						res.should.have.status(500);
						res.body.status.should.be.a("string").eql("Request Failed");
						res.body.error.error.should.be.a("string").eql("some server error");
						deleteTaskMock.restore();
						done();
					});
			});
		});
	});
});
