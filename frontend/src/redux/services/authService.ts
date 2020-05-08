import axios from 'axios';

export const signUp = (email: string, password: string) => {
  const reqBody = {
    email,
    password,
  };
  return axios({
    method: 'POST',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/auth/sign_up',
    data: {
      ...reqBody,
    },
  }).then((res) => {
    const { data } = res;
    return data.token;
  });
};

export const logIn = (email: string, password: string) => {
  const reqBody = {
    email,
    password,
  };
  return axios({
    method: 'POST',
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    url: '/auth/log_in',
    data: {
      ...reqBody,
    },
  }).then((res) => {
    const { data } = res;
    return data.token;
  });
};
