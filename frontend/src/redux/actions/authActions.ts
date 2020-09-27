import { createAction } from 'typesafe-actions';
import { ErrorResponse } from '../../types/types';

import { constants } from '../constants';

export const logIn = createAction(
  constants.LOG_IN,
  (email: string, password: string) => ({
    email,
    password,
  })
)();

export const signUp = createAction(
  constants.SIGN_UP,
  (email: string, password: string) => ({
    email,
    password,
  })
)();

export const authSucceed = createAction(
  constants.AUTH_SUCCESS,
  (token: string) => token
)();

export const authFail = createAction(
  constants.AUTH_ERROR,
  (error: ErrorResponse) => error
)();

export const logOut = createAction(constants.LOG_OUT)();

export const sessionTimeout = createAction(constants.SESSION_TIME_OUT)();
