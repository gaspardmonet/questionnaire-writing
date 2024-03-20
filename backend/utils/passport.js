const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const Admin = require('../model/AdminModel');

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    Admin.findByPk(jwtPayload.userId)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  })
);

const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = {
  passport,
  requireAuth
};