const express = require('express');

/**
 * Route Layer - order
 * Accept POST / route for posting stock order
 * validatePostOrderQuery - For validating the post body
 * validateStockID - For validating if the stock is in blacklist
 */
class OrderRouter {
	constructor(orderService) {
		this.orderService = orderService;
	}

	router() {
		const router = express.Router();
		router.post('/', this.orderService.validatePostOrderQuery.bind(this), this.orderService.validateStockID.bind(this), this.placeStockOrder.bind(this));
		return router;
	}
  
  placeStockOrder = (req, res) => (
  	this.orderService.placeStockOrder(req)
  		.then((result) => {
  			res.status(200).json({ ...result });
  		})
  		.catch((error) => {
  			console.error(error);
  			res.status(error.code).json(error);
  		})
  )
}

module.exports = OrderRouter;
