const db = require('../../models');
const TrainingWorkout = db.trainingWorkout;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.name || !req.body.trainingProgramId || !req.body.week || !req.body.day) {
		res.status(400).send({
			message: "Workout name, program ID, week, and day required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const workout = {
		trainingProgramId: req.body.trainingProgramId,
		name: req.body.name,
		description: req.body.description,
		week: req.body.week,
		day: req.body.day
	};

	TrainingWorkout.create(workout)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Workout creation.");
			console.log(err);
		});
};

exports.findAll = (req, res) => {
	const name = req.query.name;
	const programId = req.query.programId;

	var condition = null;

	if (name && programId) {
		condition = { name: { [Op.iLike]: `%${name}%` }, training_program_id: programId };
	}
	else if (name) {
		condition = { name: { [Op.iLike]: `%${name}%` } };
	}
	else if (programId) {
		condition = { training_program_id: programId };
	}

	TrainingWorkout.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Workout find.");
			console.log(err);
			console.log(req);
		});
};

exports.findById = (req, res) => {
	const id = req.params.id;

	if (!id) {
        res.status(400).send({
            message: "Workout ID required."
        });
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	TrainingWorkout.findByPk(id, { include: "trainingProgram" })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Workout find.");
			console.log(err);
			console.log(req);
		});
};	

exports.update = (req, res) => {
	if (!req.body.id || !req.body.name || !req.body.trainingProgramId || !req.body.week || !req.body.day) {
		res.status(400).send({
			message: "Workout ID, name, training program ID, week, and day are required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const workout = {
		id: req.body.id,
		trainingProgramId: req.body.trainingProgramId,
		name: req.body.name,
		description: req.body.description,
		week: req.body.week,
		day: req.body.day
	};

	TrainingWorkout.update(workout, {
		where: { id: workout.id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Workout update successfully.");
			}
			else {
				res.send("Workout could not be updated.");
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Workout update.");
			console.log(err);
			console.log(req);
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	TrainingWorkout.destroy({
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Workout deleted successfully.");
			}
			else {
				res.send("Workout could not be deleted.");
			}
		})
		.catch(err => {
			res.status(500).send(err.message);
			console.log("Error during Workout deletion.");
			console.log(err);
			console.log(req);
		});
};
