'use strict';
module.exports = (sequelize, DataTypes) => {
	var stock = sequelize.define('accounts', {
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
    password: {
      type: DataTypes.STRING,
			allowNull: false,
    }
	}, {
		timestamps: true,
	});

	return stock;
};