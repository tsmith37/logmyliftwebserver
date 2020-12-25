const db = require('../models');
const MaxWeight = db.maxWeight;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.exerciseId) {
		res.status(400).send("Exercise ID required");
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const maxWeight = {
		exerciseId: req.body.exerciseId,
		trainingWeight: req.body.trainingWeight,
		maxEffortWeight: req.body.maxEffortWeight,
		maxEffortLiftId: req.body.maxEffortLiftId,
		maxLiftWeight: req.body.maxLiftWeight,
		maxLiftLiftId: req.body.maxLiftLiftId
    };

	MaxWeight.create(maxWeight)
		.then(data => {
    		res.send(data);
        })
        .catch(err => {
        	res.status(500).send({
            	message: err.message    
            });
            console.log("Error during MaxWeight creation.");
            console.log(err);
        });
};

exports.findAll = (req, res) => {
	MaxWeight.findAll()
    	.then(data => {
        	res.send(data);
        })
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
  			console.log("Error during MaxWeight find.");
            console.log(err);
            console.log(req);
		});
};

exports.findById = (req, res) => {
	const id = req.params.id;

	if (!id) {
    	res.status(400).send("Exercise ID required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	MaxWeight.findAll({ where: {exerciseId : id}})
		.then(data => {
        	res.send(data);
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error during MaxWeight find.");
            console.log(err);
            console.log(req);
		});
};      

exports.update = (req, res) => {
	if (!req.body.exerciseId) {
        res.status(400).send("Exercise ID required");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

    const maxWeight = {
        exerciseId: req.body.exerciseId,
        trainingWeight: req.body.trainingWeight,
        maxEffortWeight: req.body.maxEffortWeight,
        maxEffortLiftId: req.body.maxEffortLiftId,
        maxLiftWeight: req.body.maxLiftWeight,
        maxLiftLiftId: req.body.maxLiftLiftId
    };

    MaxWeight.update(maxWeight, {
    	where: { exerciseId: maxWeight.exerciseId }
        })
        .then(num => {
        	if (num == 1) {
            	res.send("MaxWeight updated successfully.");
            }
            else {
            	res.send("MaxWeight could not be updated.");
            }
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error during MaxWeight update.");
            console.log(err);
            console.log(req);
		});
};

exports.delete = (req, res) => {
    const id = req.params.id;

    MaxWeight.destroy({
        where: { exerciseId: id }
        })
        .then(num => {
            if (num == 1) {
                res.send("MaxWeight deleted successfully.");
            }
            else {
                res.send("MaxWeight could not be deleted.");
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
            console.log("Error during MaxWeight deletion.");
            console.log(err);
            console.log(req);
        });
};

