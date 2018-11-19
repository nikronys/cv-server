require('module-alias/register');
import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as ActiveDirectoryStrategy from 'passport-activedirectory';

import controllers from './controllers/index';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(controllers);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new ActiveDirectoryStrategy({
  integrated: false,
  ldap: {
    url: 'ldap://192.168.10.200:389',
    baseDN: 'DC=icx, DC=local',
    username: 'username',
    password: 'password'
  }
}, function (profile, ad, done) {
  ad.isUserMemberOf(profile._json.dn, 'AccessGroup', function (err, isMember) {
    if (err) return done(err);
    return done(null, profile);
  });
}));

const opts = { failWithError: true };
app.post('/login', passport.authenticate('ActiveDirectory', opts), function(req, res) {
  res.json(req.user);
}, function (err) {
  console.log(err);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
