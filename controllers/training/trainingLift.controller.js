const db = require('../../models');
const TrainingLift = db.trainingLift;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.sequence || !req.body.exerciseId || !req.body.trainingWorkoutId) {
		res.status(400).send({
			message: "Sequence, Exercise ID, and Training Workout ID are required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const lift = {
		sequence: req.body.sequence,
		description: req.body.description,
		weight: req.body.weight,
		reps: req.body.reps,
		exerciseId: req.body.exerciseId,
		trainingWorkoutId: req.body.trainingWorkoutId
	};

	TrainingLift.create(lift)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Lift creation.");
			console.log(err);
		});
};

exports.findAll = (req, res) => {	
	const trainingWorkoutId = req.query.trainingWorkoutId;
	const exerciseId = req.query.exerciseId;

	var condition = null;

	if (trainingWorkoutId && exerciseId) {
		condition = { training_workout_id: trainingWorkoutId, exercise_id: exerciseId };
	}
	else if (trainingWorkoutId) {
		condition = { training_workout_id: trainingWorkoutId };
	}
	else if (exerciseId) {
		condition = { exercise_id: exerciseId };
	}

	sortParams = ['sequence', 'ASC'];

	TrainingLift.findAll({ where: condition, order: [sortParams], include: ["exercise", "trainingWorkout"] })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Lift find.");
			console.log(err);
			console.log(req);
		});
};

exports.findById = (req, res) => {
	const id = req.params.id;

	if (!id) {
        res.status(400).send({
            message: "Lift ID required."
        });
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	TrainingLift.findByPk(id, { include: ["exercise", "trainingWorkout"]})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Lift find.");
			console.log(err);
			console.log(req);
		});
};	

exports.update = (req, res) => {
	if (!req.body.id || !req.body.sequence || !req.body.exerciseId || !req.body.trainingWorkoutId) {
		res.status(400).send({
			message: "ID, Sequence, Exercise ID, and Training Workout ID are required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const lift = {
		id: req.body.id,
		sequence: req.body.sequence,
		description: req.body.description,
		weight: req.body.weight,
		reps: req.body.reps,
		exerciseId: req.body.exerciseId,
		trainingWorkoutId: req.body.trainingWorkoutId
	};

	TrainingLift.update(lift, {
		where: { id: lift.id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Lift update successfully.");
			}
			else {
				res.send("Lift could not be updated.");
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Lift update.");
			console.log(err);
			console.log(req);
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	TrainingLift.destroy({
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Lift deleted successfully.");
			}
			else {
				res.send("Lift could not be deleted.");
			}
		})
		.catch(err => {
			res.status(500).send(err.message);
			console.log("Error during Lift deletion.");
			console.log(err);
			console.log(req);
		});
};
