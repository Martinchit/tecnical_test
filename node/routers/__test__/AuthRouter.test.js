const AuthRouter = require('../AuthRouter');

describe('AuthRouter', () => {
  let authOrder;
  let authService;
  let req;
  const res = {
    json: jest.fn((x) => x),
    status: jest.fn(),
  };
  const successResult = 'token';
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    authService = {
      validateAuthQuery: jest.fn(),
      logIn: jest.fn().mockImplementation(() => Promise.resolve(successResult)),
      signUp: jest.fn().mockImplementation(() => Promise.resolve(successResult)),
    };
    authOrder = new AuthRouter(authService);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    authService = {
      validateAuthQuery: jest.fn(),
      logIn: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
      signUp: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    authOrder = new AuthRouter(authService);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    authOrder.router();
    restoreMock();
  });

  it('should support signUp method', (done) => {
    mockSuccessCase();
    authOrder.signUp(req, res).then(() => {
      expect(authService.signUp).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token : successResult });
      restoreMock();
      done();
    });
  });

  it('should handle signUp method error case', (done) => {
    mockFailCase();
    authOrder.signUp(req, res).then(() => {
      expect(authService.signUp).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });

  it('should support logIn method', (done) => {
    mockSuccessCase();
    authOrder.logIn(req, res).then(() => {
      expect(authService.logIn).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token : successResult });
      restoreMock();
      done();
    });
  });

  it('should handle logIn method error case', (done) => {
    mockFailCase();
    authOrder.logIn(req, res).then(() => {
      expect(authService.logIn).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });
});
