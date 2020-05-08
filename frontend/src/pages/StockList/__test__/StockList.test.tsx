import React from 'react';
import { shallow } from 'enzyme';
import axios, { AxiosStatic } from 'axios';

import { StockList } from '../StockList';
import { Spinner } from '../../../core/components/molecules/Spinner';
import { Alert } from '../../../core/components/atoms/Alert';
import { StockListHeader } from '../components/header/StockListHeader';
import { StockListPagination } from '../components/pagination/StockListPagination';
import { StockListTable } from '../components/table/StockListTable';
import { OrderSide } from '../../../types/types';

interface AxiosMock extends AxiosStatic {
  mockImplementation: Function;
  mockRestore: Function;
}

const testUUID = '9cc4ca45-b42b-462d-a8aa-931e6041cfcb';

jest.mock('axios');
jest.mock('uuid', () => ({ v4: () => testUUID }));

describe('StockList', () => {
  const totalPages = 10;
  const props = {
    getStocksAction: jest.fn(),
    addStockInOrderAction: jest.fn(),
    searchStocksAction: jest.fn(),
    logOutAction: jest.fn(),
    stocks: [
      {
        id: 1,
        stockId: 'testOne',
        currency: 'HKD',
        ric: 'testOne',
        bloombergTicker: 'testOne',
        bloombergTickerLocal: 'testOne',
        name: 'testOne',
        country: 'testOne',
        price: 100,
      },
      {
        id: 2,
        stockId: 'testTwo',
        currency: 'HKD',
        ric: 'testTwo',
        bloombergTicker: 'testTwo',
        bloombergTickerLocal: 'testTwo',
        name: 'testTwo',
        country: 'testTwo',
        price: 200,
      },
    ],
    loading: false,
    error: false,
    token: 'testToken',
    sessionTimeout: false,
  };
  const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));

  const restoreMock = () => {
    props.getStocksAction.mockRestore();
    props.addStockInOrderAction.mockRestore();
    props.searchStocksAction.mockRestore();
  };

  it('renders correctly', () => {
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    expect(wrapper).toMatchSnapshot();
    mockedAxios.mockRestore();
  });

  it('renders Spinner', () => {
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    wrapper.setState({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('calls getStocksTotalPages in componentDidMount', async () => {
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    let stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.getTotalPagesLoading).toBeTruthy();
    expect(stockListWrapper.state.currentPage).toBe(1);
    await waitForAsync();
    stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.getTotalPagesLoading).not.toBeTruthy();
    expect(stockListWrapper.state.totalPages).toBe(totalPages + 1);
    expect(stockListWrapper.state.stocksFiltered).not.toBeTruthy();
    expect(props.getStocksAction).toHaveBeenCalled();
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('calls handles getStocksTotalPages error in componentDidMount', async () => {
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ error: new Error('Test Error') });
    });
    const wrapper = shallow(<StockList {...props} />);
    let stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.getTotalPagesLoading).toBeTruthy();
    expect(stockListWrapper.state.currentPage).toBe(1);
    await waitForAsync();
    stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.getTotalPagesLoading).not.toBeTruthy();
    expect(stockListWrapper.state.getTotalPagesError).toBeTruthy();
    await waitForAsync();
    expect(wrapper.find(Alert)).toHaveLength(1);
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('handles dom events in StockListHeader', async () => {
    const searchValue = 'searchTest';
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    await waitForAsync();
    let stockListWrapper = wrapper.instance() as StockList;
    wrapper.find(StockListHeader).props().onSearchValueChangeHandler(searchValue);
    expect(stockListWrapper.state.searchValue).toBe(searchValue);
    await waitForAsync();
    wrapper.find(StockListHeader).props().onSearchButtonClickHandler();
    expect(mockedAxios).toHaveBeenCalledTimes(2);
    wrapper.find(StockListHeader).props().onClearButtonClickHandler();
    stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.searchValue).toBe('');
    expect(mockedAxios).toHaveBeenCalledTimes(3);
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('handles onPaginationButtonClickHandler', async () => {
    const selectedPage = 2;
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    await waitForAsync();
    const stockListWrapper = wrapper.instance() as StockList;
    wrapper.find(StockListPagination).props().onPaginationButtonClickHandler(2);
    expect(stockListWrapper.state.currentPage).toBe(selectedPage);
    expect(props.getStocksAction).toHaveBeenCalled();
    expect(props.getStocksAction).toHaveBeenCalledWith(selectedPage, props.token);
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('handles onPaginationButtonClickHandler in search mode', async () => {
    const selectedPage = 2;
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    await waitForAsync();
    wrapper.setState({ stocksFiltered: true, searchValue: 'testSearch' })
    const stockListWrapper = wrapper.instance() as StockList;
    wrapper.find(StockListPagination).props().onPaginationButtonClickHandler(2);
    expect(stockListWrapper.state.currentPage).toBe(selectedPage);
    expect(props.searchStocksAction).toHaveBeenCalled();
    expect(props.searchStocksAction).toHaveBeenCalledWith(stockListWrapper.state.searchValue, selectedPage, props.token);
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('handles onActionButtonClickHandler', async () => {
    const side = 'Sell' as OrderSide;
    const idx = 0;
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const wrapper = shallow(<StockList {...props} />);
    expect(mockedAxios).toHaveBeenCalledTimes(1);
    await waitForAsync();
    wrapper.find(StockListTable).props().onActionButtonClickHandler(side, idx);
    expect(props.addStockInOrderAction).toHaveBeenCalled();
    expect(props.addStockInOrderAction).toHaveBeenCalledWith({
      id: props.stocks[0].id,
      stockId: props.stocks[0].stockId,
      currency: props.stocks[0].currency,
      bloombergTickerLocal: props.stocks[0].bloombergTickerLocal,
      side,
      status: 'Not Ready',
      selected: false,
      orderId: testUUID,
    });
    await waitForAsync();
    const stockListWrapper = wrapper.instance() as StockList;
    expect(stockListWrapper.state.alert).toStrictEqual({
      [props.stocks[0].id]: side,
    });
    restoreMock();
    mockedAxios.mockRestore();
  });

  it('handles sessionTimeout change', () => {
    const mockedAxios = axios as AxiosMock;
    mockedAxios.mockImplementation(() => {
      return Promise.resolve({
        data: {
          totalPages,
        },
      });
    });
    const { alert } = window;
    delete window.alert;
    window.alert = jest.fn();
    const wrapper = shallow(<StockList {...props} />);
    wrapper.setProps({ sessionTimeout: true });
    expect(window.alert).toHaveBeenCalled();
    expect(props.logOutAction).toHaveBeenCalled();
    restoreMock();
    window.alert = alert;
  });
});
