module.exports = (sequelize, Sequelize) => {
    const MaxWeight = sequelize.define("MaxWeight", {
        exerciseId: {
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
    });

    return MaxWeight;
};

