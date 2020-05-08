const ErrorResponse = require('../shared/error');
const RandomInteger = require('../shared/randomInteger');

/**
 * Service Layer for order route
 */
class OrderService {
	constructor(joi, blacklistRules) {
		this.joi = joi;
    this.blacklistRules = blacklistRules;
	}

	// Check if all the required information are included in the request query
  validatePostOrderQuery = (req, res, next) => {
  	const { body } = req;
  	const schema = this.joi.object().keys({
      side: this.joi.string().valid(['Buy','Sell']).required(),
  		stockId: this.joi.string().guid().required(),
      stockCode: this.joi.string().required(),
      executionMode: this.joi.string().valid(['Market','Limit']).required(),
      orderPrice: this.joi.when('executionMode', { is: 'Limit', then: this.joi.number().greater(0).required() }),
      shareAmount: this.joi.number().greater(0).required(),
  	});
  	const result = this.joi.validate(body, schema);
  	const { error } = result;
  	const valid = error == null;
  	if (valid) {
  		next();
  	} else {
  		res.status(400).json(ErrorResponse('Validation Error', 'Incorrect / Missing value in request query', 400));
  	}
  }

  // Check if the request stock code is in blacklist
  validateStockID = (req, res, next) => {
  	const { body } = req;
    const { stockCode } = body;
    for (let rule of this.blacklistRules) {
      const { errorCode, errorType, errorMessage, stocks } = rule;
      if (stocks.includes(stockCode)) {
        res.status(errorCode).json(ErrorResponse(errorType, errorMessage, errorCode));
        return;
      }
    }
    next();
  }

  // place stock order and return orderPrice
  // TODO: store the orders in the database
  placeStockOrder = (req) => {
    const { body } = req;
    const { executionMode } = body;
    if (executionMode === 'Market') {
      return new Promise(resolve => resolve({ orderPrice: RandomInteger(100, 1) }));
    } else {
      const { orderPrice } = body;
      return new Promise(resolve => resolve({ orderPrice }));
    }
  }
}

module.exports = OrderService;
