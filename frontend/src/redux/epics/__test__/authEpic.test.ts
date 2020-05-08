import axios, { AxiosStatic } from 'axios';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from "rxjs";

import { SignUpEpic, LogInEpic } from '../authEpic';
import { signUp, logIn } from '../../actions/authActions';
import { AUTH_ERROR, AUTH_SUCCESS } from '../../constants/authConstant';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

jest.mock('axios');

describe('ordersEpic', () => {
  const mockedAxios = axios as AxiosMock;
  const email = 'test@test.com';
  const password = 'testPassword';
  const token = 'testToken';

  const errorResponse = {
    type: 'testError',
    description: 'testError',
    code: 400
  }

  const mockSuccess = () => {
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          token,
        },
      });
    });
  }

  const mockFail = () => {
    mockedAxios.mockImplementation(() => Promise.reject({ response: { data: errorResponse } }));
  }

  const restoreMock = () => {
    mockedAxios.mockRestore();
  }
  it('handles auth success case in SignUpEpic', async () => {
    mockSuccess();
    const action$ = ActionsObservable.of(signUp(email, password));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = SignUpEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
    })
    expect(result).toStrictEqual({
      type: AUTH_SUCCESS,
      payload: token
    })
    restoreMock();
  });

  it('handles auth error case in SignUpEpic', async () => {
    mockFail();
    const action$ = ActionsObservable.of(signUp(email, password));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = SignUpEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
    })
    expect(result).toStrictEqual({
      type: AUTH_ERROR,
      payload: errorResponse
    })
    restoreMock();
  });

  it('handles auth success case in LogInEpic', async () => {
    mockSuccess();
    const action$ = ActionsObservable.of(logIn(email, password));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = LogInEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
    })
    expect(result).toStrictEqual({
      type: AUTH_SUCCESS,
      payload: token
    })
    restoreMock();
  });

  it('handles auth error case in LogInEpic', async () => {
    mockFail();
    const action$ = ActionsObservable.of(logIn(email, password));
    const stateInput$ = new Subject();
    const state$ = new StateObservable<any>(stateInput$, undefined);
    const epic$ = LogInEpic(action$, state$, {});

    const result = await epic$.toPromise();
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
    })
    expect(result).toStrictEqual({
      type: AUTH_ERROR,
      payload: errorResponse
    })
    restoreMock();
  });
})