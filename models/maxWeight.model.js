module.exports = (sequelize, Sequelize) => {
    const MaxWeight = sequelize.define("maxWeight", {
        exercise_id: {
            type: Sequelize.INTEGER
        },
        trainingWeight: {
            type: Sequelize.INTEGER
        },
        maxEffortWeight: {
            type: Sequelize.INTEGER
        },
        maxEffortLiftId: {
            type: Sequelize.INTEGER
        },
        maxLiftWeight: {
            type: Sequelize.INTEGER
        },
        maxLiftLiftId: {
            type: Sequelize.INTEGER
        }
    },
    {
        underscored: true
    });

    return MaxWeight;
};

