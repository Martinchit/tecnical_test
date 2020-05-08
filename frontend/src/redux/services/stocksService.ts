import axios from 'axios';

export const getStocks = (page: number, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios({
    method: 'GET',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/stock',
    params: {
      page,
    },
    headers,
  }).then((res) => {
    const { data } = res;
    const { stocks } = data;
    return stocks;
  });
};

export const searchStocks = (query: string, page: number, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios({
    method: 'GET',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/stock/search',
    params: {
      query,
      page,
    },
    headers,
  }).then((res) => {
    const { data } = res;
    const { stocks } = data;
    return stocks;
  });
};
