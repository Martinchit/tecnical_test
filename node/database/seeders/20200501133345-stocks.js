'use strict';
const Stocks = require('../../public/data/stocks.json');

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.bulkInsert(
			'stocks', 
			[
				...Stocks
			]
			,
			{}
		)
  ),

  down: (queryInterface, Sequelize) => (
    queryInterface.bulkDelete('stocks', null, {})
  )
};
