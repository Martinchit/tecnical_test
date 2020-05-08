import axios, { AxiosStatic } from 'axios';

import { signUp, logIn } from '../authService';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

jest.mock('axios');

describe('authService', () => {
  const mockedAxios = axios as AxiosMock;
  const email = 'test@test.com';
  const password = 'testPassword';
  const token = 'testToken';

  it('handles signUp', (done) => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          token,
        },
      });
    });
    signUp(email, password).then((d) => {
      expect(mockedAxios).toHaveBeenCalled();
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: 'POST',
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        url: '/auth/sign_up',
        data: {
          email,
          password
        },
      });
      expect(d).toBe(token);
      mockedAxios.mockRestore();
      done();
    });
  });

  it('handles logIn', (done) => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          token,
        },
      });
    });
    logIn(email, password).then((d) => {
      expect(mockedAxios).toHaveBeenCalled();
      expect(mockedAxios).toHaveBeenCalledTimes(1);
      expect(mockedAxios).toHaveBeenCalledWith({
        method: 'POST',
        baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
        url: '/auth/log_in',
        data: {
          email,
          password
        },
      });
      expect(d).toBe(token);
      mockedAxios.mockRestore();
      done();
    });
  });
});
