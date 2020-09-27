import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionsType, RootStateType, actions } from '../../redux/store';
import { StockList } from './StockList';
import { StockOrder } from '../../types/types';

interface OwnProps {}

const mapStateToProps = (state: RootStateType) => ({
  stocks: state.stocks.stocks,
  loading: state.stocks.loading,
  error: state.stocks.error,
  token: state.auth.token,
  sessionTimeout: state.auth.sessionTimeout,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionsType>,
  props: OwnProps
) => ({
  getStocksAction: (page: number, token: string) =>
    dispatch(actions.getStocks(page - 1, token)),
  searchStocksAction: (query: string, page: number, token: string) =>
    dispatch(actions.searchStocks(query, page - 1, token)),
  addStockInOrderAction: (stockOrder: StockOrder) =>
    dispatch(actions.addStockInOrder(stockOrder)),
  logOutAction: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
