import *  as express from 'express';
import login from './login';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.use('/login', login);

export default router;