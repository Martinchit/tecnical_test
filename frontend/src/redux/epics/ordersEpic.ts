import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { ActionType, isActionOf } from 'typesafe-actions';
import * as actions from '../actions';
import { RootState } from '../reducers';
import { postStockOrder } from '../services/ordersService';

type Action = ActionType<typeof actions>;

export const PostStockOrderEpic: Epic<Action, Action, RootState> = (
  action$,
  store
) =>
  action$.pipe(
    filter(isActionOf(actions.placeStockOrder)),
    mergeMap((action) =>
      from(postStockOrder(action.payload.stockOrder, action.payload.token)).pipe(
        map((orderPrice) =>
          actions.placeStockOrderSuccess(
            action.payload.stockOrder.orderId,
            orderPrice
          )
        ),
        catchError((error) => {
          if (error.response.data.code === 401) {
            return of(actions.sessionTimeout());
          } else {
            return of(
              actions.placeStockOrderError(
                action.payload.stockOrder.orderId,
                error.response.data
              )
            );
          }
        })
      )
    )
  );

export default [PostStockOrderEpic];
