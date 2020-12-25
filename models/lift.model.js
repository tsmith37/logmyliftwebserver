const Lift = (sequelize, Sequelize, exercise, workout) => {
    var lift = sequelize.define("Lift", {
		weight: {
            type: Sequelize.INTEGER,
            allownNull: false
		},
		reps: {
			type:Sequelize.INTEGER,
            allownNull: false
		},
        description: {
            type: Sequelize.STRING(120)
        }
    });

    lift.belongsTo(exercise,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: {
                allowNull: false
              }
        });
    exercise.hasMany(lift);

    lift.belongsTo(workout,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: {
                allowNull: false
              }
        });
    workout.hasMany(lift);

    return lift;
}

module.exports = Lift;