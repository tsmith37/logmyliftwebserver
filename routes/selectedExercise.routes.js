module.exports = app => {
    const selectedExercise = require('../controllers/selectedExercise.controller.js');

    var router = require('express').Router();

    router.post("/", selectedExercise.create);
    router.get("/", selectedExercise.find);
    router.put("/", selectedExercise.create);
    router.delete("/", selectedExercise.delete);

    app.use('/api/selectedExercise', router);
};
