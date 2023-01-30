import express from 'express'
import * as NoteController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', newNoteValidator,userAuth, NoteController.createNote)

router.put('/:id',userAuth, NoteController.updateNote)

router.get('/',userAuth,NoteController.findAllNotes)

router.get('/:id',userAuth,NoteController.findNote)

router.delete('/:id',userAuth,NoteController.deleteNote)

export default router
