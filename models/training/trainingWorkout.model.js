const TrainingWorkout = (sequelize, Sequelize, trainingProgram) => {
    var trainingWorkout = sequelize.define("trainingWorkout", {
        name: {
            type: Sequelize.STRING(60)
        },
        description: {
            type: Sequelize.STRING(120)
        },
        week: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        day: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true
    });

    trainingWorkout.belongsTo(trainingProgram,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        });
    trainingProgram.hasMany(trainingWorkout);

    return trainingWorkout;
}

module.exports = TrainingWorkout;