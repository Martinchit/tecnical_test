import { authReducer, initialState } from '../authReducer';
import {
  logIn,
  signUp,
  authSucceed,
  authFail,
  logOut,
  sessionTimeout,
} from '../../actions/authActions';
import { ErrorResponse } from '../../../types/types';

describe('authReducer', () => {
  const email = 'test@test.com';
  const password = 'testPassword';
  const token = 'testToken';
  const errorResponse = {
    type: 'testError',
    description: 'testError',
    code: 400,
  } as ErrorResponse;

  it('should handle logIn', () => {
    const action = logIn(email, password);
    expect(authReducer(undefined, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle signUp', () => {
    const action = signUp(email, password);
    expect(authReducer(undefined, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle authSucceed', () => {
    const state = { ...initialState, loading: true };
    const action = authSucceed(token);
    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loading: false,
      token,
      loggedIn: true,
    });
  });

  it('should handle authFail', () => {
    const state = { ...initialState, loading: true };
    const action = authFail(errorResponse);
    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loading: false,
      error: errorResponse.description,
    });
  });

  it('should handle authFail with wild error', () => {
    const state = { ...initialState, loading: true };
    const action = authFail({ type: '', description: '', code: 400 });
    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Please try again',
    });
  });

  it('should handle sessionTimeout', () => {
    const state = { ...initialState };
    const action = sessionTimeout();
    expect(authReducer(state, action)).toEqual({
      ...initialState,
      sessionTimeout: true,
    });
  });

  it('should handle logOut', () => {
    const state = {
      ...initialState,
      token,
      loggedIn: true,
      sessionTimeout: true,
    };
    const action = logOut();
    expect(authReducer(state, action)).toEqual({
      ...initialState,
      loggedIn: false,
      token: '',
      sessionTimeout: false,
    });
  });
});
