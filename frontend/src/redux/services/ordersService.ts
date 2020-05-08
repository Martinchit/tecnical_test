import axios from 'axios';
import { StockOrder } from '../../types/types';

export const postStockOrder = (stockOrder: StockOrder, token: string) => {
  const {
    side,
    stockId,
    bloombergTickerLocal,
    executionMode,
    orderPrice,
    shareAmount,
  } = stockOrder;
  const reqBody = {
    side,
    stockId,
    stockCode: bloombergTickerLocal,
    executionMode,
    orderPrice: executionMode === 'Limit' ? orderPrice : null,
    shareAmount,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios({
    method: 'POST',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/order',
    data: {
      ...reqBody,
    },
    headers,
  }).then((res) => {
    const { data } = res;
    return data.orderPrice;
  });
};
