module.exports = app => {
	const trainingLift = require('../../controllers/training/trainingLift.controller.js');

	var router = require('express').Router();

	router.post("/", trainingLift.create);
	router.get("/", trainingLift.findAll);
	router.get("/:id", trainingLift.findById);
	router.put("/", trainingLift.update);
	router.delete("/:id", trainingLift.delete);

	app.use('/api/training/lift', router);
};
