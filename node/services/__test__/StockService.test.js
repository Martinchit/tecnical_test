const joi = require('joi');
const StockService = require('../StockService');

describe('StockService', () => {
	let stockService;
	let req;
	const res = {
		status: jest.fn(),
		json: jest.fn(),
	};
	let next = jest.fn();
  const stocks = [{ id: 1 }, { id: 2 }];
  const totalPages = { totalPages: 100 };
	let models;
	

	const mockGetStockSuccessCase = () => {
    req = {
			query: {
				page: 1
			}
		};
    models = {
      stocks: {
        findAll: jest.fn().mockImplementation(() => Promise.resolve(stocks)),
      },
    };
  };

  const mockSearchStockSuccessCase = () => {
    req = {
			query: {
				query: '11',
        page: 0,
			}
		};
    models = {
      sequelize: {
        query: jest.fn().mockImplementation(() => Promise.resolve(stocks)),
        QueryTypes: {
          SELECT: 'SELECT'
        }
      },
    };
  };

  const mockTotalPagesSuccessCase = () => {
    models = {
      sequelize: {
        query: jest.fn().mockImplementation(() => Promise.resolve([ totalPages ])),
        QueryTypes: {
          SELECT: 'SELECT'
        }
      },
    };
  };

  const mockValidationFailCase = () => {
    req = {
      query: {
      }
    };
  };

   const mockQueryFailCase = () => {
    models = {
      sequelize: {
        query: jest.fn().mockImplementation(() => Promise.reject()),
        QueryTypes: {
          SELECT: 'SELECT'
        }
      },
      stocks: {
        findAll: jest.fn().mockImplementation(() => Promise.reject()),
      },
    };
  };

  const mockService = () => {
    stockService = new StockService(joi, models);
    res.status.mockReturnValue(res);
  };

	const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next = jest.fn();
  };

	it('should pass validateGetStocksQuery', () => {
		mockGetStockSuccessCase();
		mockService();
		stockService.validateGetStocksQuery(req, res, next);
		expect(next).toBeCalled();
		restoreMock();
	});

	it('should not pass validateGetStocksQuery with incorrect query value', () => {
		mockValidationFailCase();
		mockService();
		stockService.validateGetStocksQuery(req, res, next);
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
  
  it('should pass validateSearchStocksQuery', () => {
		mockSearchStockSuccessCase();
		mockService();
		stockService.validateSearchStocksQuery(req, res, next);
		expect(next).toBeCalled();
		restoreMock();
	});

	it('should not pass validateSearchStocksQuery with incorrect query value', () => {
		mockValidationFailCase();
		mockService();
		stockService.validateSearchStocksQuery(req, res, next);
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


	it('should return stocks in getStocks', (done) => {
		mockGetStockSuccessCase();
		mockService();
		stockService.getStocks(req)
			.then((data) => {
				expect(data).toBeDefined();
        expect(data).toBe(stocks);
        restoreMock();
				done();
			});
	});

  it('should handle in getStocks error case', (done) => {
		mockQueryFailCase();
		mockService();
		stockService.getStocks(req)
			.catch((err) => {
				expect(err).toBeDefined();
        expect(err).toStrictEqual({
          type: 'Request Error',
          description: 'Failed to fulfill the request',
          code: 400
        });
        restoreMock();
				done();
			});
	});

  it('should return stocks in searchStocks', (done) => {
    mockSearchStockSuccessCase();
    mockService();
		stockService.searchStocks(req)
			.then((data) => {
				expect(data).toBeDefined();
        expect(data).toBe(stocks);
				done();
			});
	});

  it('should handle in searchStocks error case', (done) => {
		mockQueryFailCase();
		mockService();
		stockService.searchStocks(req)
			.catch((err) => {
				expect(err).toBeDefined();
        expect(err).toStrictEqual({
          type: 'Request Error',
          description: 'Failed to fulfill the request',
          code: 400
        });
        restoreMock();
				done();
			});
	});

  it('should return totalPages in getTotalPages', (done) => {
    req = {
      query: {}
    };
    mockTotalPagesSuccessCase();
    mockService();
		stockService.getTotalPages(req)
			.then((data) => {
				expect(data).toBeDefined();
        expect(data).toBe(totalPages);
				done();
			});
	});

  it('should return totalPages in getTotalPages', (done) => {
    req = {
      query: {
        query: '11',
      }
    };
    mockTotalPagesSuccessCase();
    mockService();
		stockService.getTotalPages(req)
			.then((data) => {
				expect(data).toBeDefined();
        expect(data).toBe(totalPages);
				done();
			});
	});

  it('should handle in getTotalPages error case', (done) => {
		mockQueryFailCase();
		mockService();
		stockService.getTotalPages(req)
			.catch((err) => {
				expect(err).toBeDefined();
        expect(err).toStrictEqual({
          type: 'Request Error',
          description: 'Failed to fulfill the request',
          code: 400
        });
        restoreMock();
				done();
			});
	});
});
