import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';
import { actions } from '../actions';
import { RootState } from '../reducers';
import { signUp, logIn } from '../services/authService';

type Action = ActionType<typeof actions>;

export const SignUpEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.signUp)),
    mergeMap((action) =>
      from(signUp(action.payload.email, action.payload.password)).pipe(
        map((token) => actions.authSucceed(token)),
        catchError((error) => of(actions.authFail(error.response.data)))
      )
    )
  );

export const LogInEpic: Epic<Action, Action, RootState> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.logIn)),
    mergeMap((action) =>
      from(logIn(action.payload.email, action.payload.password)).pipe(
        map((token) => actions.authSucceed(token)),
        catchError((error) => of(actions.authFail(error.response.data)))
      )
    )
  );

export default [SignUpEpic, LogInEpic];
