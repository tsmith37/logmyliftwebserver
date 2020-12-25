const dbConfig = require('../config/db.config.js');
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());

var dbConn = mysql.createConnection({
	host:'localhost',
	user:'logmyliftuser',
	password:'logmyliftpass',
	database:'LogMyLiftDb',
	multipleStatements:true
});

dbConn.connect((err) => {
	if (err)
	{
		console.log("Connection failed..." + JSON.stringify(err, undefined, 2));
	}
	else
	{
		console.log("Connection successful.");
	}
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

// Exercise API
app.get('/exercise', (req, res) => {
	var filter = '%';
	if (req.query.name)
	{
		filter = '%' + req.query.name + '%';
	}
	
	var sql = "SELECT * FROM Exercise WHERE Name LIKE ?";
	dbConn.query(sql, [filter], (err, rows, fields) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			res.send(rows);
		}
	});
});

app.get('/exercise/:id', (req, res) => {
	var sql = "SELECT * FROM Exercise WHERE ExerciseId = ?";
	dbConn.query(sql, [req.params.id], (err, rows, fields) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			res.send(rows);
		}
	});
});

app.post('/exercise', (req, res) => {
	let exercise = req.body;
	var sql = "SET @exerciseId = ?;SET @name = ?;SET @description = ?;CALL AddOrEditExercise_SP(@exerciseId, @name, @description);";
	dbConn.query(sql, [exercise.exerciseId, exercise.name, exercise.description], (err, rows, fields) => {
		if (err)
		{
			console.log(err);
		}
		else
		{
			rows.forEach(element => {
				if (element.constructor == Array)
				{
					res.send("New Exercise ID: " + element[0].exerciseId);
				}
			});	
		}
	});
});

app.put('/exercise', (req, res) => {
    let exercise = req.body;
    var sql = "SET @exerciseId = ?;SET @name = ?;SET @description = ?;CALL AddOrEditExercise_SP(@exerciseId, @name, @description);";
    dbConn.query(sql, [exercise.exerciseId, exercise.name, exercise.description], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        { 
        	res.send("Exercise updated successfully.");
        }
    });
});

app.delete('/exercise/:id', (req, res) => {
	var sql = "DELETE FROM Exercise WHERE ExerciseId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Exercise deleted successfully.");
        }
	});
});

// Workout API
app.get('/workout', (req, res) => {
    var filter = '%';
    if (req.query.description)
    {
        filter = '%' + req.query.description + '%';
    }

    var sql = "SELECT * FROM Workout WHERE Description LIKE ?";
    dbConn.query(sql, [filter], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.get('/workout/:id', (req, res) => {
    var sql = "SELECT * FROM Workout WHERE WorkoutId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.post('/workout', (req, res) => {
    let workout = req.body;
    var sql = "SET @workoutId = ?;SET @description = ?;SET @startDateTime = ?;CALL AddOrEditWorkout_SP(@workoutId, @description, @startDateTime);";
    dbConn.query(sql, [workout.workoutId, workout.description, workout.startDateTime], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            rows.forEach(element => {
                if (element.constructor == Array)
                {
                    res.send("New Workout ID: " + element[0].workoutId);
                }
            });
        }
    });
});

app.put('/workout', (req, res) => {
    let workout = req.body;
    var sql = "SET @workoutId = ?;SET @description = ?;SET @startDateTime = ?;CALL AddOrEditWorkout_SP(@workoutId, @description, @startDateTime);";
    dbConn.query(sql, [workout.workoutId, workout.description, workout.startDateTime], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Workout updated successfully.");
        }
    });
});

app.delete('/workout/:id', (req, res) => {
    var sql = "DELETE FROM Workout WHERE WorkoutId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Workout deleted successfully.");
        }
    });
});

// Lift API
app.get('/lift', (req, res) => {
	var workoutIdFilterString = "WorkoutId != ?";
	var workoutIdFilterValue = "0";
    if (req.query.workoutId)
    {
		workoutIdFilterString = "WorkoutId = ?";
		workoutIdFilterValue = req.query.workoutId;
    }

	var exerciseIdFilterString = "ExerciseId != ?";
	var exerciseIdFilterValue = "0";
	if (req.query.exerciseId)
	{
		exerciseIdFilterString = "ExerciseId = ?";
		exerciseIdFilterValue = req.query.exerciseId;
	}

	var sql = "SELECT * FROM Lift WHERE " + workoutIdFilterString + " AND " + exerciseIdFilterString;
    dbConn.query(sql, [workoutIdFilterValue, exerciseIdFilterValue], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.get('/lift/:id', (req, res) => {
    var sql = "SELECT * FROM Lift WHERE LiftId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.post('/lift', (req, res) => {
    let lift = req.body;
    var sql = "SET @liftId = ?;SET @exerciseId = ?;SET @workoutId = ?;SET @weight = ?;SET @reps = ?;SET @description = ?;SET @startDateTime = ?;CALL AddOrEditLift_SP(@liftId, @exerciseId, @workoutId, @weight, @reps, @description, @startDateTime);";
    dbConn.query(sql, [lift.liftId, lift.exerciseId, lift.workoutId, lift.weight, lift.reps, lift.description, lift.startDateTime], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            rows.forEach(element => {
                if (element.constructor == Array)
                {
                    res.send("New Lift ID: " + element[0].liftId);
                }
            });
        }
    });
});

app.put('/lift', (req, res) => {
    let lift = req.body;
    var sql = "SET @liftId = ?;SET @exerciseId = ?;SET @workoutId = ?;SET @weight = ?;SET @reps = ?;SET @description = ?;SET @startDateTime = ?;CALL AddOrEditLift_SP(@liftId, @exerciseId, @workoutId, @weight, @reps, @description, @startDateTime);";
    dbConn.query(sql, [lift.liftId, lift.exerciseId, lift.workoutId, lift.weight, lift.reps, lift.description, lift.startDateTime], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
			res.send("Lift updated successfully.");
        }
    });
});

app.delete('/lift/:id', (req, res) => {
    var sql = "DELETE FROM Lift WHERE LiftId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Lift deleted successfully.");
        }
    });
});

// MaxWeight API
app.get('/maxWeight/:id', (req, res) => {
    var sql = "SELECT * FROM MaxWeight WHERE ExerciseId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.post('/maxWeight', (req, res) => {
    let maxWeight = req.body;
    var sql = "SET @exerciseId = ?;SET @trainingWeight = ?;SET @maxEffortWeight = ?;SET @maxEffortLiftId = ?;SET @maxLiftWeight = ?;SET @maxLiftLiftId = ?;CALL AddOrEditMaxWeight_SP(@exerciseId, @trainingWeight, @maxEffortWeight, @maxEffortLiftId, @maxLiftWeight, @maxLiftLiftId);";
    dbConn.query(sql, [maxWeight.exerciseId, maxWeight.trainingWeight, maxWeight.maxEffortWeight, maxWeight.maxEffortLiftId, maxWeight.maxLiftWeight, maxWeight.maxLiftLiftId], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
			res.send("Max effort updated.");
        }
    });
});

app.put('/maxWeight', (req, res) => {
    let maxWeight = req.body;
    var sql = "SET @exerciseId = ?;SET @trainingWeight = ?;SET @maxEffortWeight = ?;SET @maxEffortLiftId = ?;SET @maxLiftWeight = ?;SET @maxLiftLiftId = ?;CALL AddOrEditMaxWeight_SP(@exerciseId, @trainingWeight, @maxEffortWeight, @maxEffortLiftId, @maxLiftWeight, @maxLiftLiftId);";
    dbConn.query(sql, [maxWeight.exerciseId, maxWeight.trainingWeight, maxWeight.maxEffortWeight, maxWeight.maxEffortLiftId, maxWeight.maxLiftWeight, maxWeight.maxLiftLiftId], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {           
            res.send("Max effort updated.");
        }
    });
});

app.delete('/maxWeight/:id', (req, res) => {
    var sql = "DELETE FROM MaxWeight WHERE ExerciseId = ?";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Max effort deleted successfully.");
        }
    });
});

// SelectedExercise API
app.get('/selectedExercise', (req, res) => {
    var sql = "SELECT * FROM SelectedExercise";
    dbConn.query(sql, [req.params.id], (err, rows, fields) => {
        if (err)
        {   
            console.log(err);
        }
        else
        {
            res.send(rows);
        }
    });
});

app.post('/selectedExercise', (req, res) => {
    let selectedExercise = req.body;
    var sql = "SET @exerciseId = ?;CALL AddOrEditSelectedExercise_SP(@exerciseId);";
    dbConn.query(sql, [selectedExercise.exerciseId], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {           
            res.send("Selected exercise updated.");
        }
    });
});

app.put('/selectedExercise', (req, res) => {
    let selectedExercise = req.body;
    var sql = "SET @exerciseId = ?;CALL AddOrEditSelectedExercise_SP(@exerciseId);";
    dbConn.query(sql, [selectedExercise.exerciseId], (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        { 
            res.send("Selected exercise updated.");
        }
    });
});

app.delete('/selectedExercise', (req, res) => {
    var sql = "DELETE FROM SelectedExercise";
    dbConn.query(sql, (err, rows, fields) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send("Selected exercise deleted successfully.");
        }
    });
});

