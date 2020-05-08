const OrderRouter = require('../OrderRouter');

describe('OrderRouter', () => {
  let orderRouter;
  let orderService;
  let req;
  const res = {
    json: jest.fn((x) => x),
    status: jest.fn(),
  };
  const successResult = { orderPrice: 100 };
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    orderService = {
      validatePostOrderQuery: jest.fn(),
      validateStockID: jest.fn(),
      placeStockOrder: jest.fn().mockImplementation(() => Promise.resolve(successResult)),
    };
    orderRouter = new OrderRouter(orderService);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    orderService = {
      validatePostOrderQuery: jest.fn(),
      validateStockID: jest.fn(),
      placeStockOrder: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    orderRouter = new OrderRouter(orderService);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    orderRouter.router();
    restoreMock();
  });

  it('should support placeStockOrder method', (done) => {
    mockSuccessCase();
    orderRouter.placeStockOrder(req, res).then(() => {
      expect(orderService.placeStockOrder).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ ...successResult });
      restoreMock();
      done();
    });
  });

  it('should handle placeStockOrder method error case', (done) => {
    mockFailCase();
    orderRouter.placeStockOrder(req, res).then(() => {
      expect(orderService.placeStockOrder).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });
});
