const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	test: {
		username: process.env.TEST_DATABASE_USERNAME,
		password: process.env.TEST_DATABASE_PASSWORD,
		database: process.env.TEST_DATABASE_DBNAME,
		host: process.env.TEST_DATABASE_HOST,
		dialect: "postgres",
		logging: false,
	},
	development: {
		username: process.env.DEV_DATABASE_USERNAME,
		password: process.env.DEV_DATABASE_PASSWORD,
		database: process.env.DEV_DATABASE_DBNAME,
		host: process.env.DEV_DATABASE_HOST,
		dialect: "postgres",
		logging: false,
	},
	production: {
		username: process.env.PROD_DATABASE_USERNAME,
		password: process.env.PROD_DATABASE_PASSWORD,
		database: process.env.PROD_DATABASE_DBNAME,
		host: process.env.PROD_DATABASE_HOST,
		dialect: "postgres",
		logging: false,
	},
	isDev: process.env.NODE_ENV === "development",
	isTest: process.env.NODE_ENV === 'test',
	port: process.env.PORT,
};
