module.exports = app => {
	const trainingWorkout = require('../../controllers/training/trainingWorkout.controller.js');

	var router = require('express').Router();

	router.post("/", trainingWorkout.create);
	router.get("/", trainingWorkout.findAll);
	router.get("/:id", trainingWorkout.findById);
	router.put("/", trainingWorkout.update);
	router.delete("/:id", trainingWorkout.delete);

	app.use('/api/training/workout', router);
};
