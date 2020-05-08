import { createAction } from 'typesafe-actions';
import { ErrorResponse } from '../../types/types';

import {
  LOG_IN,
  SIGN_UP,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOG_OUT,
  SESSION_TIME_OUT,
} from '../constants';

export const logIn = createAction(LOG_IN, (email: string, password: string) => ({
  email,
  password,
}))();

export const signUp = createAction(SIGN_UP, (email: string, password: string) => ({
  email,
  password,
}))();

export const authSucceed = createAction(AUTH_SUCCESS, (token: string) => token)();

export const authFail = createAction(AUTH_ERROR, (error: ErrorResponse) => error)();

export const logOut = createAction(LOG_OUT)();

export const sessionTimeout = createAction(SESSION_TIME_OUT)();
