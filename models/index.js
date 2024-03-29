const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

sequelize = null;
if (process.env.HEROKU_POSTGRESQL_TEAL_URL)
{
	sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_TEAL_URL, {
		dialect: dbConfig.dialect,
		protocol: 'postgres',
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false
			}
		}
	})
}
else
{
	sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		operatorAliases: false,
		freezeTableName: true
	});
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.exercise = require('./exercise.model.js')(sequelize, Sequelize);
db.workout = require('./workout.model.js')(sequelize, Sequelize);
db.lift = require('./lift.model.js')(sequelize, Sequelize, db.exercise, db.workout);
db.maxWeight = require('./maxWeight.model.js')(sequelize, Sequelize);
db.selectedExercise = require('./selectedExercise.model.js')(sequelize, Sequelize);
db.userSettings = require('./userSettings.model.js')(sequelize, Sequelize);

db.trainingProgram = require('./training/trainingProgram.model.js')(sequelize, Sequelize);
db.trainingWorkout = require('./training/trainingWorkout.model.js')(sequelize, Sequelize, db.trainingProgram);
db.trainingLift = require('./training/trainingLift.model.js')(sequelize, Sequelize, db.exercise, db.trainingWorkout);

module.exports = db;
