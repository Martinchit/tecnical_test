'use strict';
module.exports = (sequelize, DataTypes) => {
	var stock = sequelize.define('stocks', {
		stockId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		currency: {
			type: DataTypes.STRING(5),
			allowNull: false,
		},
		ric: {
			type: DataTypes.STRING(15),
			allowNull: false,
		},
		bloombergTicker: {
			type: DataTypes.STRING(15),
			allowNull: false,
		},
		bloombergTickerLocal: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});

	return stock;
};