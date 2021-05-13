module.exports = (sequelize, Sequelize) => {
	const UserSettings = sequelize.define("userSettings", {
		groupLiftsByExercise: {
			type: Sequelize.BOOLEAN
		}
	},
    {
        underscored: true,
		freezeTableName: true
    });

	return UserSettings;
};
