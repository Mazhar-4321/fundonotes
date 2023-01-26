import express from 'express';
import userRoute from './user.route';
const router = express.Router();
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  return router;
};
export default routes;
