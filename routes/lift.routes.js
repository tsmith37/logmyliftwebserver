module.exports = app => {
    const lift = require('../controllers/lift.controller.js');

    var router = require('express').Router();

    router.post("/", lift.create);
    router.get("/", lift.findAll);
    router.get("/:id", lift.findById);
    router.put("/", lift.update);
    router.delete("/:id", lift.delete);

    app.use('/api/lift', router);
};
