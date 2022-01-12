const TrainingLift = (sequelize, Sequelize, exercise, trainingWorkout, trainingProgram) => {
    var trainingLift = sequelize.define("trainingLift", {
        sequence: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        weight: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        reps: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(120)
        }
    },
    {
        underscored: true
    });

    trainingLift.belongsTo(exercise,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    exercise.hasMany(trainingLift);

    trainingLift.belongsTo(trainingWorkout,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: {
                allowNull: false
            },
            through: 'TrainingProgram'
        });
    trainingWorkout.hasMany(trainingLift);

    return trainingLift;
}

module.exports = TrainingLift;