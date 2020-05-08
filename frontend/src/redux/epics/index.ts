import { combineEpics } from 'redux-observable';

import FetchStockEpic from './stocksEpic';
import PostStockOrderEpic from './ordersEpic';
import AuthEpic from './authEpic';

const epics = combineEpics(...FetchStockEpic, ...PostStockOrderEpic, ...AuthEpic);

export default epics;
