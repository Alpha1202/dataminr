import "regenerator-runtime/runtime.js";
import express from "express";

import middlewareConfig from "./db/config/middlewares.js";
import config from "./db/config/config.js";
import router from "./modules";

const { port } = config;

const app = express();
middlewareConfig(app);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Dataminr coding test",
  });
});

app.use(router);

app.all("*", (req, res) =>
	res.status(404).send({
		status: "error",
		message: "you have entered an incorrect route",
	})
);

const	server = app.listen(port, () => console.log(`Welcome, listening on ${port}`));
 

export default server;
