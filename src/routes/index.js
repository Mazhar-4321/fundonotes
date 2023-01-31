import express from 'express'
import userRoute from './user.route'
import notesRoute from './note.route'
import notesTrashRoute from './note.trash.route'
import notesArchiveRoute from './note.archive.route'

const router = express.Router()

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute)
  router.use('/notes/trash',notesTrashRoute)
  router.use('/notes/archive',notesArchiveRoute)
  router.use('/notes', notesRoute)
  return router
}

export default routes
