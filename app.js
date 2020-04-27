/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { checkEnvVars } = require('./helper/helper');

// Mongoose connect status colors
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

// Environment vars
const env = process.env;

// Check required environment vars
if (checkEnvVars(env) === true) {
	console.log(error('\nFill in all the variables in the .env file'));
	process.exit(0);
}

const host =
	env.NODE_ENV === 'production'
		? env.MONGO_DB
		: 'mongodb://localhost:27017/gCalendarBot';

// Mongoose connect
mongoose.connect(host, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

mongoose.connection
	.once('connected', () => {
		console.log(connected('\nConnection established successfully'));
		require('./bot')();
	})
	.on('error', function (err) {
		console.log(
			error('\nMongoose default connection has occured ' + err + ' error')
		);
	})
	.on('disconnected', function () {
		console.log(disconnected('\nMongoose default connection is disconnected'));
	});

process.on('SIGINT', function () {
	mongoose.connection.close(() => {
		console.log(termination('Bye bye!'));
		process.exit(0);
	});
});
