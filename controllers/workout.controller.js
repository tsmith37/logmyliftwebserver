const db = require('../models');
const Workout = db.workout;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	const workout = {
    	description: req.body.description
    };

	Workout.create(workout)
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
	const description = req.query.description;
    const sortBy = req.query.sortBy;
    const sortDir = req.query.sortDir;
    var condition = description ? { description: { [Op.iLike]: `%${description}%` } } : null;
    
    sortParams = ['createdAt', 'DESC'];
    if (sortBy)
    {
        if (sortBy !== 'createdAt') 
        {
            console.log("Invalid sort column. Ignoring.");
        }
        
        if (sortDir === 'ASC' || sortDir === 'DESC')
        {
            sortParams = [sortBy, sortDir];
        }
        else if (sortDir)
        {
            console.log("Invalid sort direction. Ignoring.");
            sortParams = [sortBy];
        }
        else
        {
            sortParams = [sortBy];
        }
    }

	Workout.findAll({ where: condition, order: [sortParams] })
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
    	res.status(400).send("Workout ID required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	Workout.findByPk(id)
		.then(data => {
        	res.send(data);
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error during Workout find.");
            console.log(err);
            console.log(req);
		});
};      

exports.findMostRecent = (req, res) => {
    sortParams = ['createdAt', 'DESC'];
	Workout.findOne({ order: [sortParams] })
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
	if (!req.body.id || !req.body.description) {
		res.status(400).send("Workout ID and description required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

    const workout = {
    	id: req.body.id,
        description: req.body.description
    };

    Workout.update(workout, {
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
        	res.status(500).send(err.message);
            console.log("Error during Workout update.");
            console.log(err);
            console.log(req);
		});
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Workout.destroy({
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

