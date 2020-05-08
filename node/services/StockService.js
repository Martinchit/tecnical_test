const ErrorResponse = require('../shared/error');

/**
 * Service Layer for stock route
 */
class StockService {
	constructor(joi, models) {
		this.joi = joi;
		this.models = models;
		this.limit = 50;
	}

	// Check if page is included in the get request query, for psql query
  validateGetStocksQuery = (req, res, next) => {
  	const { query } = req;
  	const schema = this.joi.object().keys({
  		page: this.joi.number().required().min(0),
  	});
  	const result = this.joi.validate(query, schema);
  	const { error } = result;
  	const valid = error == null;
  	if (valid) {
  		next();
  	} else {
  		res.status(400).json(ErrorResponse('Validation Error', 'Incorrect / Missing value in request query', 400));
  	}
  }

	// Check if query is included in the get request query, for psql query
  validateSearchStocksQuery = (req, res, next) => {
  	const { query } = req;
  	const schema = this.joi.object().keys({
  		query: this.joi.string().required(),
			page: this.joi.number().required().min(0),
  	});
  	const result = this.joi.validate(query, schema);
  	const { error } = result;
  	const valid = error == null;
  	if (valid) {
  		next();
  	} else {
  		res.status(400).json(ErrorResponse('Validation Error', 'Incorrect / Missing value in request query', 400));
  	}
  }
  
	// get stocks by page
	getStocks = async (req) => {
		try {
			const { stocks } = this.models;
			const { page } = req.query;
			const limit = this.limit;
			const offset = page * limit;
			const result = await stocks.findAll({
				offset,
				order: [
					['id', 'ASC'],
				],
				limit,
			});
			return result;
		} catch (e) {
			throw ErrorResponse('Request Error', 'Failed to fulfill the request', 400);
		}
	};

	// search stocks by stock code
	searchStocks = async (req) => {
		const { query, page } = req.query;
		const limit = this.limit;
		const offset = page * limit;
		try {
			const { sequelize } = this.models;
			const result = await sequelize.query(`select * from stocks where "bloombergTickerLocal" like '${query}%' offset ${offset} limit ${limit}`, { type: sequelize.QueryTypes.SELECT});
			return result;
		} catch (e) {
			throw ErrorResponse('Request Error', 'Failed to fulfill the request', 400);
		}
	}

	// totalPages is for frontend pagination
	getTotalPages = async (req) => {
		try {
			const { query } = req.query;
			let filterQuery = query ? `where "bloombergTickerLocal" like '${query}%'` : '';
			const { sequelize } = this.models;
			const result = await sequelize.query(`SELECT ceil(COUNT(*)/50::integer) as "totalPages" FROM stocks ${filterQuery}`, { type: sequelize.QueryTypes.SELECT});
			return result[0];
		} catch (e) {
			throw ErrorResponse('Request Error', 'Failed to fulfill the request', 400);
		}
	}
}

module.exports = StockService;
