import * as stocksActions from './stocksActions';

import * as ordersActions from './ordersActions';

import * as authActions from './authActions';

export const actions = {
  ...stocksActions,
  ...ordersActions,
  ...authActions,
};
