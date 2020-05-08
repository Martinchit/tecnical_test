require('dotenv').config();
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
const Morgan = require('morgan');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const passport = require('./passport');
const StockOrderBlacklistRules = require('../config/StockOrderBlacklistRules.json');

module.exports = (models, config, routers, services) => {
  const { StockRouter, OrderRouter, AuthRouter } = routers;
  const { StockService, OrderService, AuthService } = services;
  const App = Express();
  const passportAuth = passport(config, models);
  passportAuth.initialize();
  App.use(BodyParser.json());
  App.use(BodyParser.urlencoded({ extended: false }));
  App.use(Cors());
  App.use(Morgan('combined'));

  App.use('/api/stock', passportAuth.authenticate(), new StockRouter(new StockService(Joi, models)).router());
  App.use('/api/order', passportAuth.authenticate(), new OrderRouter(new OrderService(Joi, StockOrderBlacklistRules)).router());
  App.use('/api/auth', new AuthRouter(new AuthService(Joi, models, Jwt, config, Bcrypt)).router());
  return {
    App: App
  };
};
