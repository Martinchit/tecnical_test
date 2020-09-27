import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { StockListHeader } from './components/header/StockListHeader';
import { StockListTable } from './components/table/StockListTable';
import { StockListPagination } from './components/pagination/StockListPagination';
import { PageTitle } from '../../core/components/molecules/PageTitle';
import { FlexBox } from '../../core/components/atoms/FlexBox';
import { Spinner } from '../../core/components/molecules/Spinner';
import { Alert } from '../../core/components/atoms/Alert';
import {
  OrderSide,
  Stock,
  StockOrder,
  StockListAlert,
} from '../../types/types';

interface StockListState {
  currentPage: number;
  totalPages: number;
  getTotalPagesLoading: boolean;
  getTotalPagesError: boolean;
  alert: StockListAlert;
  searchValue: string;
  stocksFiltered: boolean;
}

interface StockListProps {
  getStocksAction: (page: number, token: string) => void;
  addStockInOrderAction: (stockOrder: StockOrder) => void;
  searchStocksAction: (query: string, page: number, token: string) => void;
  logOutAction: () => void;
  stocks: Stock[];
  loading: boolean;
  error: boolean;
  token: string;
  sessionTimeout: boolean;
}

export class StockList extends React.Component<StockListProps, StockListState> {
  constructor(props: StockListProps) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 0,
      getTotalPagesLoading: false,
      getTotalPagesError: false,
      alert: {},
      searchValue: '',
      stocksFiltered: false,
    };
  }

  componentDidMount = () => {
    this.getStocksTotalPages();
  };

  componentDidUpdate = () => {
    const { sessionTimeout, logOutAction } = this.props;
    if (sessionTimeout) {
      alert('Session Timeout - Please log in again!');
      logOutAction();
    }
  };

  getStocksTotalPages = (query: string | null = null) => {
    const { token } = this.props;
    this.setState({ getTotalPagesLoading: true, currentPage: 1 });
    const params = query ? { query } : null;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
      url: '/stock/total_pages',
      params,
      headers,
    })
      .then((res) => {
        const { totalPages } = res.data;
        const { getStocksAction, searchStocksAction } = this.props;
        const { currentPage } = this.state;
        this.setState({
          totalPages: totalPages + 1,
          getTotalPagesLoading: false,
        });
        if (query) {
          this.setState({ stocksFiltered: true });
          searchStocksAction(query, currentPage, token);
        } else {
          this.setState({ stocksFiltered: false });
          getStocksAction(currentPage, token);
        }
      })
      .catch((errorRes) => {
        const { error } = errorRes;
        console.error(error);
        this.setState({
          getTotalPagesError: true,
          getTotalPagesLoading: false,
        });
      });
  };

  onActionButtonClickHandler = (side: OrderSide, idx: number) => {
    const { addStockInOrderAction, stocks } = this.props;
    const targetedStock = stocks[idx];
    const { id, stockId, currency, bloombergTickerLocal } = targetedStock;
    const alert = { [id]: side };
    const stockOrder: StockOrder = {
      id,
      stockId,
      currency,
      bloombergTickerLocal,
      side,
      status: 'Not Ready',
      selected: false,
      orderId: uuidv4(),
    };
    addStockInOrderAction(stockOrder);
    this.setState({ alert });
  };

  onPaginationButtonClickHandler = (selectedPage: number) => {
    const { stocksFiltered, searchValue } = this.state;
    const { getStocksAction, token, searchStocksAction } = this.props;
    this.setState({ currentPage: selectedPage }, () => {
      if (stocksFiltered) {
        searchStocksAction(searchValue, selectedPage, token);
      } else {
        getStocksAction(selectedPage, token);
      }
    });
  };

  onSearchValueChangeHandler = (searchValue: string) => {
    this.setState({ searchValue });
  };

  onSearchButtonClickHandler = () => {
    const { searchValue } = this.state;
    this.setState({ alert: {} }, () => {
      this.getStocksTotalPages(searchValue);
    });
  };

  onClearButtonClickHandler = () => {
    this.setState({ searchValue: '', alert: {} }, () => {
      this.getStocksTotalPages();
    });
  };

  render() {
    const {
      alert,
      currentPage,
      totalPages,
      getTotalPagesLoading,
      getTotalPagesError,
      searchValue,
      stocksFiltered,
    } = this.state;
    const { loading, stocks } = this.props;
    return (
      <>
        <PageTitle title="Stock List" />
        <StockListHeader
          searchValue={searchValue}
          buttonsDisable={loading || !searchValue.trim().length}
          onSearchValueChangeHandler={this.onSearchValueChangeHandler}
          onSearchButtonClickHandler={this.onSearchButtonClickHandler}
          onClearButtonClickHandler={this.onClearButtonClickHandler}
          isStocksFiltered={stocksFiltered}
        />
        <FlexBox margin="2% 0%">
          {loading || getTotalPagesLoading ? (
            <Spinner />
          ) : getTotalPagesError ? (
            <Alert variant="danger">Network error. Please refresh!</Alert>
          ) : (
            <>
              <StockListTable
                alert={alert}
                stocks={stocks}
                onActionButtonClickHandler={this.onActionButtonClickHandler}
              />
              <FlexBox margin="4% 0 0 0">
                <StockListPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPaginationButtonClickHandler={
                    this.onPaginationButtonClickHandler
                  }
                />
              </FlexBox>
            </>
          )}
        </FlexBox>
      </>
    );
  }
}
