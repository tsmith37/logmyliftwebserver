module.exports = app => {
    const maxWeight = require('../controllers/maxWeight.controller.js');

    var router = require('express').Router();

    router.post("/", maxWeight.create);
    router.get("/", maxWeight.findAll);
    router.get("/:id", maxWeight.findById);
    router.put("/", maxWeight.update);
    router.delete("/:id", maxWeight.delete);

    app.use('/api/maxWeight', router);
};
