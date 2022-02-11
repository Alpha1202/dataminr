import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";

chai.should();
chai.use(chaiHttp);

describe("server", () => {
	it("should start the server successfully", (done) => {
		chai
			.request(app)
			.get("/")
			.end((err, res) => {
				res.should.have.status(200);
				res.body.status.should.be.a("number").eql(200);
				res.body.message.should.be.a("string").eql("Dataminr coding test");
				done();
			});
	});

	it("should return no route found", (done) => {
		chai
			.request(app)
			.get("/error")
			.end((err, res) => {
				res.should.have.status(404);
				res.body.status.should.be.a("string").eql("error");
				res.body.message.should.be.a("string").eql("you have entered an incorrect route");
				done();
			});
	});
});
