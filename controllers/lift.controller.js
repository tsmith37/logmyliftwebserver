const db = require('../models');
const Lift = db.lift;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	const lift = {
		exerciseId: req.body.exerciseId,
		workoutId: req.body.workoutId,
		weight: req.body.weight,
		reps: req.body.reps,
    	description: req.body.description
    };

	Lift.create(lift)
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
	const exerciseId = req.query.exerciseId;
    const workoutId = req.query.workoutId;
    const sortBy = req.query.sortBy;
    const sortDir = req.query.sortDir;

	var condition = null;

	if (exerciseId && workoutId) {
		condition = {exercise_id: exerciseId, workout_id: workoutId};
	}
	else if (exerciseId) {
		condition = {exercise_id: exerciseId};
	}
	else if(workoutId) {
		condition = {workout_id: workoutId};
    }
    
    sortParams = ['created_at', 'DESC'];
    if (sortBy)
    {
        if (sortBy !== 'created_at' && sortBy !== 'weight') 
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


	Lift.findAll({ where: condition , include: "exercise", order: [sortParams]})
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
    	res.status(400).send("Lift ID required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

	Lift.findByPk(id, {include: "exercise"})
		.then(data => {
            res.send(data);
            console.log
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error during Lift find.");
            console.log(err);
            console.log(req);
		});
};      

exports.update = (req, res) => {
	if (!req.body.id || !req.body.exerciseId || !req.body.workoutId || !req.body.weight || !req.body.reps) {
		res.status(400).send("Exercise ID, Workout ID, weight, and reps required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

    const lift = {
    	id: req.body.id,
    	ExerciseId: req.body.exerciseId,	
    	WorkoutId: req.body.workoutId,
    	weight: req.body.weight,
    	reps: req.body.reps,
        description: req.body.description
    };

    Lift.update(lift, {
    	where: { id: lift.id }
        })
        .then(num => {
        	if (num == 1) {
            	res.send("Lift updated successfully.");
            }
            else {
            	res.send("Lift could not be updated.");
            }
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error during Lift update.");
            console.log(err);
            console.log(req);
		});
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Lift.destroy({
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