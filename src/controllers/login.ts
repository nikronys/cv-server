import * as passport from 'passport';
import * as express from 'express';
import * as ActiveDirectoryStrategy from 'passport-activedirectory';
import crendentials from './../config/credentials';

const router = express.Router();

passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  ldap: {
    url: 'ldap://192.168.10.200:389',
    baseDN: 'DC=icx, DC=local',
    username: crendentials.username,
    password: crendentials.password
  }
}, (profile, ad, done) => {
  ad.isUserMemberOf(profile._json.dn, 'AccessGroup', (err, isMember) => {
    if (err) return done(err);
    return done(null, profile);
  });
}));

const opts = { failWithError: false, successRedirect: '/', failureRedirect: '/login' };
router.post('/', (req, res) => {
  passport.authenticate('ActiveDirectory', opts, (err, user) => {
    if (err) {
      res.status(401).send('Not Authenticated');
    }
    else {
      res.json(user);
    }
  })(req, res);
});

export default router;
