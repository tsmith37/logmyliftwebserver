module.exports = app => {
	const userSettings = require('../controllers/userSettings.controller.js');

	var router = require('express').Router();

	router.get("/", userSettings.get);
	router.put("/", userSettings.update);

	app.use('/api/userSettings', router);
};
