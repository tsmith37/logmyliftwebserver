module.exports = app => {
	const exercise = require('../controllers/exercise.controller.js');

	var router = require('express').Router();

	router.post("/", exercise.create);
	router.get("/", exercise.findAll);
	router.get("/:id", exercise.findById);
	router.put("/", exercise.update);
	router.delete("/:id", exercise.delete);

	app.use('/api/exercise', router);
};
