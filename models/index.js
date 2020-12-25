const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		operatorAliases: false,
		freezeTableName: true
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.exercise = require('./exercise.model.js')(sequelize, Sequelize);
db.workout = require('./workout.model.js')(sequelize, Sequelize);
db.lift = require('./lift.model.js')(sequelize, Sequelize, db.exercise, db.workout);
db.maxWeight = require('./maxWeight.model.js')(sequelize, Sequelize);
db.selectedExercise = require('./selectedExercise.model.js')(sequelize, Sequelize);

module.exports = db;
