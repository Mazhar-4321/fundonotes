import express from 'express'
import userRoute from './user.route'
import notesRoute from './note.route'

const bodyParser= require('body-parser')
const router = express.Router()
const Producer = require('../producer')
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.post(`/sendLog`,async(req,res,next)=>{
await new Producer().publishMessage(req.body.logType,req.body.message)
res.send()
})
  router.use('/users', userRoute)
  router.use('/notes', notesRoute)
  return router
}

export default routes
