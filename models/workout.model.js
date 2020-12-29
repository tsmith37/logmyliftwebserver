module.exports = (sequelize, Sequelize) => {
    const Workout = sequelize.define("workout", {
        description: {
            type: Sequelize.STRING(120)
        }
    },
    {
        underscored: true
    });

    return Workout;
};

