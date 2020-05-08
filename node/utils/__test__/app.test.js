const request  = require('supertest');
const config = require('../../config');
const StockService = require('../../services/StockService');
const OrderService = require('../../services/OrderService');
const AuthService = require('../../services/AuthService');
const StockRouter = require('../../routers/StockRouter');
const OrderRouter = require('../../routers/OrderRouter');
const AuthRouter = require('../../routers/AuthRouter');

// Test Passport Authentication with supertest
describe('App', () => {
  const services = { StockService, OrderService, AuthService };
  const routers = { StockRouter, OrderRouter, AuthRouter };
  const models = {};
  const { App } = require('../app')(models, config, routers, services);

  it('should return 401 in /api/stock route without token', (done) => {
    request(App)
      .get('/api/stock')
      .end((err, res) => {
        expect(res.unauthorized).toBeTruthy();
        expect(res.statusCode).toBe(401);
        done();
      });
  });

  it('should return 401 in /api/order route without token', (done) => {
    request(App)
      .post('/api/order')
      .end((err, res) => {
        expect(res.unauthorized).toBeTruthy();
        expect(res.statusCode).toBe(401);
        done();
      });
  });
});