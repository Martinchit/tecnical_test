const joi = require('joi');
const OrderService = require('../OrderService');
const StockOrderBlacklistRules = require('../../config/StockOrderBlacklistRules.json');

describe('OrderService', () => {
	let orderService;
	let req;
	const res = {
		status: jest.fn(),
		json: jest.fn(),
	};
	let next = jest.fn();
	

	const mockSuccessCase = () => {
    req = {
			body: {
				side: 'Buy',
				stockId: '7f5f0946-1144-472a-b14e-61bb39a7d976',
				stockCode: '123 HK',
				executionMode: 'Market',
				orderPrice: 100,
				shareAmount: 100,
			}
		};
  };

  const mockService = () => {
    orderService = new OrderService(joi, StockOrderBlacklistRules);
    res.status.mockReturnValue(res);
  };

	const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next = jest.fn();
  };

	it('should pass validatePostOrderQuery', () => {
		mockSuccessCase();
		mockService();
		orderService.validatePostOrderQuery(req, res, next);
		expect(next).toBeCalled();
		restoreMock();
	});

	it('should not pass validateGetAppQuery with incorrect query value', () => {
		const req = {
			body: {}
		};
		mockService();
		orderService.validatePostOrderQuery(req, res, next);
		expect(res.status).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({
        type: 'Validation Error',
        description: 'Incorrect / Missing value in request query',
        code: 400
      });
		restoreMock();
	});

	it('should pass validateStockID', () => {
		mockSuccessCase();
		mockService();
		orderService.validateStockID(req, res, next);
		expect(next).toBeCalled();
		restoreMock();
	});

	it('should not pass validateStockID & return 504 error with the stock value of 11 HK', () => {
		const req = {
			body: {
				side: 'Buy',
				stockId: '7f5f0946-1144-472a-b14e-61bb39a7d976',
				stockCode: '11 HK',
				executionMode: 'Market',
				orderPrice: 100,
				shareAmount: 100,
			}
		};
		mockService();
		orderService.validateStockID(req, res, next);
		expect(res.status).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(504);
		expect(res.json).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({
        type: 'Timeout Error',
        description: 'Gateway Timeout',
        code: 504
      });
		restoreMock();
	});

	it('should not pass validateStockID & return 500 error with the stock value of 5 HK', () => {
		const req = {
			body: {
				side: 'Buy',
				stockId: '7f5f0946-1144-472a-b14e-61bb39a7d976',
				stockCode: '5 HK',
				executionMode: 'Market',
				orderPrice: 100,
				shareAmount: 100,
			}
		};
		mockService();
		orderService.validateStockID(req, res, next);
		expect(res.status).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({
        type: 'Internal Server Error',
        description: 'Unable to fulfill the order request',
        code: 500
      });
		restoreMock();
	});

	it('should not pass validateStockID & return 403 error with the stock value of 388 HK', () => {
		const req = {
			body: {
				side: 'Buy',
				stockId: '7f5f0946-1144-472a-b14e-61bb39a7d976',
				stockCode: '388 HK',
				executionMode: 'Market',
				orderPrice: 100,
				shareAmount: 100,
			}
		};
		mockService();
		orderService.validateStockID(req, res, next);
		expect(res.status).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({
        type: 'Request Error',
        description: 'Forbidden',
        code: 403
      });
		restoreMock();
	});


	it('should return random integer in placeStockOrder with executionMode of Market', (done) => {
		mockSuccessCase();
		mockService();
		orderService.placeStockOrder(req)
			.then((data) => {
				expect(data).toBeDefined();
				done();
			});
	});

  it('should return random integer in placeStockOrder with executionMode of Limit', (done) => {
		mockSuccessCase();
		mockService();
		req = {
			body: {
				side: 'Buy',
				stockId: '7f5f0946-1144-472a-b14e-61bb39a7d976',
				stockCode: '123 HK',
				executionMode: 'Limit',
				orderPrice: 100,
				shareAmount: 100,
			}
		};
		orderService.placeStockOrder(req)
			.then((data) => {
				expect(data).toBeDefined();
				expect(data).toStrictEqual({ orderPrice: req.body.orderPrice });
				done();
			});
	});
});
