import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions';
import { updateObject } from '../../core/lib/utils/updateObject';

type Action = ActionType<typeof actions>;

export interface AuthState {
  readonly loading: boolean;
  readonly token: string;
  readonly error: string;
  readonly loggedIn: boolean;
  readonly sessionTimeout: boolean;
}

export const initialState: AuthState = {
  loading: false,
  token: '',
  error: '',
  loggedIn: false,
  sessionTimeout: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case getType(actions.logIn):
      return updateObject(state, { loading: true, error: '' });
    case getType(actions.signUp):
      return updateObject(state, { loading: true, error: '' });
    case getType(actions.authSucceed):
      return updateObject(state, {
        loading: false,
        token: action.payload,
        loggedIn: true,
      });
    case getType(actions.authFail):
      return updateObject(state, {
        loading: false,
        error: action.payload.description || 'Please try again',
      });
    case getType(actions.logOut):
      return updateObject(state, {
        token: '',
        loggedIn: false,
        sessionTimeout: false,
      });
    case getType(actions.sessionTimeout):
      return updateObject(state, { sessionTimeout: true });
    default:
      return state;
  }
};
