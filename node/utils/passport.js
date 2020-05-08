const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const ErrorResponse = require('../shared/error');

module.exports = (config, models) => {
  const { accounts } = models;
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwtSecret;
  const strategy = new passportJWT.Strategy(opts, (payload, done) => {
    if (!payload.exp || new Date() > new Date(payload.exp * 1000)) {
      return done(new Error('Authentication Error'), null);
    }
    const findAccountQuery = accounts.findOne({ where: { email: payload.email } });
    findAccountQuery.then(user => {
      if (user) {
        return done(null, { user });
      } else {
        return done(new Error('Authentication Error'), null);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => (req, res, next) => {
      return passport.authenticate('jwt', config.jwtSession, (err, data, info) => {
        if (err || info || !data) {
          res.status(401).json(ErrorResponse('Unauthorized', 'Please log in or sign up to access the content', 401));
        } else {
          next();
        }
      })(req, res, next);
    }
  };
};
