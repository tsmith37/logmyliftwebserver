const db = require('../models');
const UserSettings = db.userSettings;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
    UserSettings.findOrCreate({
        where: 
        {
        id: 1
        }}).then(data => {
        	res.send(data[0]);
        })
		.catch(err => {
			res.status(500).send({
				message: err.message
			});
  			console.log("Error getting user settings.");
            console.log(err);
            console.log(req);
		});
};

exports.update = (req, res) => {
	if (!req.body.groupLiftsByExercise) {
        res.status(400).send("groupLiftsByExercise is required.");
        console.log("Content not valid.");
        console.log(req);
        return;
    }

    const userSettings = {
        groupLiftsByExercise: req.body.groupLiftsByExercise
    };

    UserSettings.update(userSettings, {
    	where: { id: 1 }
        })
        .then(num => {
        	if (num == 1) {
            	res.send("User settings updated successfully.");
            }
            else {
            	res.send("User settings could not be updated.");
            }
        })
        .catch(err => {
        	res.status(500).send(err.message);
            console.log("Error updating user settings.");
            console.log(err);
            console.log(req);
		});
};