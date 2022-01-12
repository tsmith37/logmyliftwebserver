module.exports = (sequelize, Sequelize) => {
    const TrainingProgram = sequelize.define("trainingProgram", {
        name: {
            type: Sequelize.STRING(60)
        },
        description: {
            type: Sequelize.STRING(120)
        }
    },
    {
        underscored: true
    });

    return TrainingProgram;
};
