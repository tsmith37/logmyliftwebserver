module.exports = (sequelize, Sequelize) => {
	const Exercise = sequelize.define("Exercise", {
		name: {
			type: Sequelize.STRING(60)
		},
		description: {
			type: Sequelize.STRING(120)
		}
	});

	return Exercise;
};
