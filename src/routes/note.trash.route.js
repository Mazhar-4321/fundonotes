import express from 'express'
import * as NoteController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/:id',userAuth,NoteController.findTrashNote)

router.get('/',userAuth,NoteController.findAllTrashNotes)

router.put('/:id',userAuth,NoteController.updateTrashNote)

router.delete('/:id',userAuth,NoteController.deleteTrashNote)


export default router
