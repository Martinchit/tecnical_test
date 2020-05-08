const StockRouter = require('../StockRouter');

describe('StockRouter', () => {
  let stockRouter;
  let stockService;
  let req;
  const res = {
    json: jest.fn((x) => x),
    status: jest.fn(),
  };
  const fetchTotalPagesSuccessResult = { totalPages: 10 };
  const fetchStockSuccessResult = { stocks: [{ id: 1 }, { id: 2 }]};
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    stockService = {
      validateSearchStocksQuery: jest.fn(),
      validateGetStocksQuery: jest.fn(),
      getStocks: jest.fn().mockImplementation(() => Promise.resolve(fetchStockSuccessResult)),
      searchStocks: jest.fn().mockImplementation(() => Promise.resolve(fetchStockSuccessResult)),
      getTotalPages: jest.fn().mockImplementation(() => Promise.resolve(fetchTotalPagesSuccessResult)),
    };
    stockRouter = new StockRouter(stockService);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    stockService = {
      validateSearchStocksQuery: jest.fn(),
      validateGetStocksQuery: jest.fn(),
      getStocks: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
      searchStocks: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
      getTotalPages: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    stockRouter = new StockRouter(stockService);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    stockRouter.router();
    restoreMock();
  });

  it('should support getStocks method', (done) => {
    mockSuccessCase();
    stockRouter.getStocks(req, res).then(() => {
      expect(stockService.getStocks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ stocks: fetchStockSuccessResult });
      restoreMock();
      done();
    });
  });

  it('should handle getStocks method error case', (done) => {
    mockFailCase();
    stockRouter.getStocks(req, res).then(() => {
      expect(stockService.getStocks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      restoreMock();
      done();
    });
  });

  it('should support searchStocks method', (done) => {
    mockSuccessCase();
    stockRouter.searchStocks(req, res).then(() => {
      expect(stockService.searchStocks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ stocks: fetchStockSuccessResult });
      restoreMock();
      done();
    });
  });

  it('should handle searchStocks method error case', (done) => {
    mockFailCase();
    stockRouter.searchStocks(req, res).then(() => {
      expect(stockService.searchStocks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      restoreMock();
      done();
    });
  });

  it('should support getTotalPages method', (done) => {
    mockSuccessCase();
    stockRouter.getTotalPages(req, res).then(() => {
      expect(stockService.getTotalPages).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ...fetchTotalPagesSuccessResult });
      restoreMock();
      done();
    });
  });

  it('should handle getTotalPages method error case', (done) => {
    mockFailCase();
    stockRouter.getTotalPages(req, res).then(() => {
      expect(stockService.getTotalPages).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      restoreMock();
      done();
    });
  });
});
