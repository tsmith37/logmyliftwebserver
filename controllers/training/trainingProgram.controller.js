const db = require('../../models');
const TrainingProgram = db.trainingProgram;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Program name required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const program = {
		name: req.body.name,
		description: req.body.description
	};

	TrainingProgram.create(program)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Program creation.");
			console.log(err);
		});
};

exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

	TrainingProgram.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Program find.");
			console.log(err);
			console.log(req);
		});
};

exports.findById = (req, res) => {
	const id = req.params.id;

	if (!id) {
        res.status(400).send({
            message: "Program ID required."
        });
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	TrainingProgram.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
			console.log("Error during Program find.");
			console.log(err);
			console.log(req);
		});
};	

exports.update = (req, res) => {
	if (!req.body.id || !req.body.name) {
		res.status(400).send({
			message: "Program ID and name required."
		});
		console.log("Content not valid.");
		console.log(req);
		return;
	}

	const program = {
		id: req.body.id,
		name: req.body.name,
		description: req.body.description
	};

	TrainingProgram.update(program, {
		where: { id: program.id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Program updated successfully.");
			}
			else {
				res.send("Program could not be updated.");
			}
		})
		.catch(err => {
			res.status(500).send({
				message: err.message	
			});
			console.log("Error during Program update.");
			console.log(err);
			console.log(req);
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	TrainingProgram.destroy({
		where: { id: id }
		})
		.then(num => {
			if (num == 1) {
				res.send("Program deleted successfully.");
			}
			else {
				res.send("Program could not be deleted.");
			}
		})
		.catch(err => {
			res.status(500).send(err.message);
			console.log("Error during Program deletion.");
			console.log(err);
			console.log(req);
		});
};
