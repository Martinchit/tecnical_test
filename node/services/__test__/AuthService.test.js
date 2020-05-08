const joi = require('joi');
const AuthService = require('../AuthService');

describe('AuthService', () => {
	let authService;
	let req;
	const res = {
		status: jest.fn(),
		json: jest.fn(),
	};
  let users = [];
	let next = jest.fn();
  const hashPassword = 'hashPassword';
  const token = 'token';
  const user = {
    id: 1,
    email: 'test@test.com',
    password: '12345678',
    createdAt: '2010-10-10 00:00:00',
    updatedAt: '2010-10-10 00:00:00',
  };
  const config = { jwtSecret: 'secret' };
  let models;
  let jwt;
  let bcrypt;

	const mockResource = () => {
    req = {
			body: {
				email: user.email,
        password: user.password
			}
		};
     models = {
      accounts: {
        findOne: jest.fn().mockImplementation(() => Promise.resolve(user)),
        findOrCreate: jest.fn().mockImplementation(() => Promise.resolve(users.includes(user) ? [user, false] : [user, true]))
      }
    };
    jwt = {
      sign: jest.fn().mockImplementation(() => Promise.resolve(token)),
    };
    bcrypt = {
      hash: jest.fn().mockImplementation(() => Promise.resolve(hashPassword)),
      compare: jest.fn().mockImplementation((password) => Promise.resolve(hashPassword === password))
    };
  };

  const mockService = () => {
    authService = new AuthService(joi, models, jwt, config, bcrypt);
    res.status.mockReturnValue(res);
  };

	const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
    models.accounts.findOne.mockRestore();
    models.accounts.findOrCreate.mockRestore();
    jwt.sign.mockRestore();
    bcrypt.hash.mockRestore();
    bcrypt.compare.mockRestore();
    users = [];
  };

	it('should pass validateAuthQuery', () => {
		mockResource();
		mockService();
		authService.validateAuthQuery(req, res, next);
		expect(next).toBeCalled();
		restoreMock();
	});

	it('should not pass validateAuthQuery with incorrect query value', () => {
		const req = {
			body: {}
		};
		mockService();
		authService.validateAuthQuery(req, res, next);
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

  it('return token for sign up', async () => {
    mockResource();
		mockService();
		const result = await authService.signUp(req);
    expect(result).toBe(token);
    restoreMock();
	});

  it('return error for sign up', async () => {
    mockResource();
		mockService();
    users = [user];
    try {
      await authService.signUp(req, res, next);
    } catch (error) {
      expect(error).toStrictEqual({
        description: 'Email is already created',
        type: 'Sign Up Error',
        code: 400,
      });
    }   
    restoreMock();
	});

  it('return token for log in', async () => {
    mockResource();
    req = {
			body: {
				email: user.email,
        password: hashPassword
			}
		};
		mockService();
		const result = await authService.logIn(req);
    expect(result).toBe(token);
    restoreMock();
	});

  it('return error for log in when password is incorrect', async () => {
    mockResource();
		mockService();
    users = [user];
    try {
      await authService.logIn(req, res, next);
    } catch (error) {
      expect(error).toStrictEqual({
        description: 'Incorrect Email or Password',
        type: 'Log In Error',
        code: 400,
      });
    }   
    restoreMock();
	});

  it('return error for log in when email is not found', async () => {
    mockResource();
    models.accounts.findOne = jest.fn().mockImplementation(() => Promise.resolve(null)),
		mockService();
    users = [user];
    try {
      await authService.logIn(req, res, next);
    } catch (error) {
      expect(error).toStrictEqual({
        description: 'Incorrect Email or Password',
        type: 'Log In Error',
        code: 400,
      });
    }   
    restoreMock();
	});

});
