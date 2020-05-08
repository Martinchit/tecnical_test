const express = require('express');

/**
 * Route Layer - stock
 * Accept GET / route for retrieving stocks data
 * Accept GET /total_pages route for retrieving total pages of all stocks
 * validateGetStocksQuery - For validating the get stocks query
 * validateSearchStocksQuery - For validating the search stocks query
 */
class StocksRouter {
	constructor(stockService) {
		this.stockService = stockService;
	}

	router() {
		const router = express.Router();
		router.get('/', this.stockService.validateGetStocksQuery.bind(this), this.getStocks.bind(this));
		router.get('/search', this.stockService.validateSearchStocksQuery.bind(this), this.searchStocks.bind(this));
		router.get('/total_pages', this.getTotalPages.bind(this));
		return router;
	}
  
  getStocks = (req, res) => (
  	this.stockService.getStocks(req)
  		.then((stocks) => {
  			res.status(200).json({ stocks });
  		})
  		.catch((error) => {
  			console.error(error);
  			res.status(error.code).json(error);
  		})
  )

	searchStocks = (req, res) => (
  	this.stockService.searchStocks(req)
  		.then((stocks) => {
  			res.status(200).json({ stocks });
  		})
  		.catch((error) => {
  			console.error(error);
  			res.status(error.code).json(error);
  		})
  )

	getTotalPages = (req, res) => (
		this.stockService.getTotalPages(req)
  		.then(({ totalPages }) => {
  			res.status(200).json({ totalPages });
  		})
  		.catch((error) => {
  			console.error(error);
  			res.status(error.code).json(error);
  		})
	)
}

module.exports = StocksRouter;
