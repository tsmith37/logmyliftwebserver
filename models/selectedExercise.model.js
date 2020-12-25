module.exports = (sequelize, Sequelize) => {
    const SelectedExercise = sequelize.define("SelectedExercise", {
        exerciseId: {
            type: Sequelize.INTEGER
        }},
		{
        	freezeTableName: true
	    });

    return SelectedExercise;
};

