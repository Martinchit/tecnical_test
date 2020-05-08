const express = require('express');


/**
 * Route Layer - order
 * Accept POST / route for sign up
 * Accept POST / route for log in
 * validateAuthQuery - For validating the post body
 */
class AuthRouter {
  constructor (authService) {
    this.authService = authService;
  }

  router () {
    const router = express.Router();
    router.post('/sign_up', this.authService.validateAuthQuery.bind(this), this.signUp.bind(this));
    router.post('/log_in', this.authService.validateAuthQuery.bind(this), this.logIn.bind(this));
    return router;
  }

  logIn (req, res) {
    return this.authService.logIn(req)
      .then((token) => {
        res.json({ token });
      })
      .catch((err) => {
        res.status(err.code).json(err);
      });
  }

  signUp (req, res) {
    return this.authService.signUp(req)
      .then((token) => {
        res.json({ token });
      })
      .catch((err) => {
        res.status(err.code).json(err);
      });
  }
}

module.exports = AuthRouter;
