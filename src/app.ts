require('module-alias/register');
import * as express from 'express';
import controllers from './controllers/index';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(controllers);

app.listen(port, () => console.log(`Listening on port ${port}`));
