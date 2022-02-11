import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import dotenv from "dotenv";
import sinon from "sinon";
import { assert } from "@sinonjs/referee";

import app from "../src/app";

import { Task } from "../src/db/models";

dotenv.config();

chai.use(chaiHttp);
chai.should();

const taskResponse = {
	successful: true,
	newTask: {},
};
const newTaskObj = {
	title: "title",
};
describe("Task model", () => {
	describe("Create task helper", () => {
		it("should create a new task in the db and return", (done) => {
			const TaskModelMock = sinon.stub(Task, "create").callsFake(() => taskResponse);

			chai
				.request(app)
				.post("/api/v1/tasks/create")
				.send(newTaskObj)
				.end((err, res) => {
					assert.equals(Task.create(), taskResponse);
					TaskModelMock.restore();
					done();
				});
		});
	});
});
