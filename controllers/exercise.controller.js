const db = require('../models');
const Exercise = db.exercise;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Exercise name required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const exercise = {
		name: req.body.name,
		description: req.body.description
	};

	Exercise.create(exercise)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Exercise creation.");
			console.log(err);
		});
};

exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

	Exercise.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Exercise find.");
			console.log(err);
			console.log(req);
		});
};

exports.findById = (req, res) => {
	const id = req.params.id;

	if (!id) {
        res.status(400).send({
            message: "Exercise ID required."
        });
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	Exercise.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Exercise find.");
			console.log(err);
			console.log(req);
		});
};	

exports.update = (req, res) => {
	if (!req.body.id || !req.body.name) {
		res.status(400).send({
			message: "Exercise ID and name required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const exercise = {
		id: req.body.id,
		name: req.body.name,
		description: req.body.description
	};

	Exercise.update(exercise, {
		where: { id: exercise.id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Exercise update successfully.");
			}
			else {
				res.send("Exercise could not be updated.");
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Exercise update.");
			console.log(err);
			console.log(req);
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Exercise.destroy({
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Exercise deleted successfully.");
			}
			else {
				res.send("Exercise could not be deleted.");
			}
		})
		.catch(err => {
			res.status(500).send(err.message);
			console.log("Error during Exercise deletion.");
			console.log(err);
			console.log(req);
		});
};
