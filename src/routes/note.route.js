import express from 'express'
import * as NoteController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'
const router = express.Router()
router.post('/', newNoteValidator,userAuth, NoteController.createNote)
router.post('/:title',userAuth, NoteController.updateNote)
router.get('/',userAuth,NoteController.findAllNotes)
router.get('/:title',userAuth,NoteController.findNote)
router.delete('/:title',userAuth,NoteController.deleteNote)
export default router
