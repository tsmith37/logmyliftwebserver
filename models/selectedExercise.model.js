module.exports = (sequelize, Sequelize) => {
    const SelectedExercise = sequelize.define("selected_exercise", {
        exerciseId: {
            type: Sequelize.INTEGER
        }},
		{
        	freezeTableName: true
	    });

    return SelectedExercise;
};

