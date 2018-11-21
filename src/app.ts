import * as express from 'express';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';

import controllers from './controllers/index';
import models from './models/index';
import db from './models/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(controllers);

models.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

