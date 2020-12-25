const db = require('../models');
const SelectedExercise = db.selectedExercise;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.exerciseId) {
		res.status(400).send("Exercise ID required");
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const selectedExercise = {
		exerciseId: req.body.exerciseId
    };

	SelectedExercise.destroy({
		where: { id: { [Op.ne]: null } }
	})


	SelectedExercise.create(selectedExercise)
		.then(data => {
    		res.send(data);
        })
        .catch(err => {
        	res.status(500).send({
            	message: err.message    
            });
            console.log("Error during SelectedExercise creation.");
            console.log(err);
        });
};

exports.find = (req, res) => {
	SelectedExercise.findAll()
    	.then(data => {
        	res.send(data);
        })
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
  			console.log("Error during SelectedExercise find.");
            console.log(err);
            console.log(req);
		});
};

exports.delete = (req, res) => {
	SelectedExercise.destroy({
		where: { id: { [Op.ne]: null } }
	})
        .then(num => {
            if (num == 1) {
                res.send("SelectedExercise deleted successfully.");
            }
            else {
                res.send("SelectedExercise could not be deleted.");
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
            console.log("Error during SelectedExercise deletion.");
            console.log(err);
            console.log(req);
        });
};

