module.exports = (sequelize, Sequelize) => {
    const Workout = sequelize.define("Workout", {
        description: {
            type: Sequelize.STRING(120)
        }
    });

    return Workout;
};

