import express from 'express'
import * as NoteController from '../controllers/note.controller'
import { newNoteValidator } from '../validators/note.validator'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', newNoteValidator,userAuth, NoteController.createNote)

router.put('/email',NoteController.sendEmail)

router.put('trash/:id',userAuth,NoteController.updateTrashNote)

router.put('archive/:id',userAuth,NoteController.updateNoteArchiveStatus)

router.put('/:id',newNoteValidator,userAuth, NoteController.updateNote)

router.get('/trash/:id',userAuth,NoteController.findTrashNote)

router.get('/archive/:id',userAuth,NoteController.findArchivedNote)

router.get('/trash',userAuth,NoteController.findAllTrashNotes)

router.get('/archive',userAuth,NoteController.findAllArchivedNotes)

router.get('/:id',userAuth,NoteController.findNote)

router.get('/',userAuth,NoteController.findAllNotes)

router.delete('/:id',userAuth,NoteController.deleteNote)

router.delete('trash/:id',userAuth,NoteController.deleteTrashNote)
 
export default router
