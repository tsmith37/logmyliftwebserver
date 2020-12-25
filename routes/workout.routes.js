module.exports = app => {
    const workout = require('../controllers/workout.controller.js');

    var router = require('express').Router();

    router.post("/", workout.create);
    router.get("/", workout.findAll);
    router.get("/:id", workout.findById);
    router.get("/get/mostRecent", workout.findMostRecent);
    router.put("/", workout.update);
    router.delete("/:id", workout.delete);

    app.use('/api/workout', router);
};
