const Lift = (sequelize, Sequelize, exercise, workout) => {
    var lift = sequelize.define("lift", {
		weight: {
            type: Sequelize.INTEGER,
            allowNull: false
		},
		reps: {
			type:Sequelize.INTEGER,
            allowNull: false
		},
        description: {
            type: Sequelize.STRING(120)
        },
        calculatedMax: {
            type: Sequelize.VIRTUAL,
            get() {
                return (this.weight / (1.0278 - (0.0278 * this.reps)));
            },
            set(value) {
                throw new Error('Do not try to set the `calculatedMax` value!');
            }
        }
    },
    {
        underscored: true
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