module.exports = app => {
	const trainingProgram = require('../../controllers/training/trainingProgram.controller.js');

	var router = require('express').Router();

	router.post("/", trainingProgram.create);
	router.get("/", trainingProgram.findAll);
	router.get("/:id", trainingProgram.findById);
	router.put("/", trainingProgram.update);
	router.delete("/:id", trainingProgram.delete);

	app.use('/api/training/program', router);
};
