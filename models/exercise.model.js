module.exports = (sequelize, Sequelize) => {
	const Exercise = sequelize.define("exercise", {
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

	return Exercise;
};
