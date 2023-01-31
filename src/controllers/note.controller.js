import HttpStatus from 'http-status-codes'
import * as NoteService from '../services/note.service'

export const createNote = async (req, res, next) => {
  try {
    const data = await NoteService.createNote(req.body)
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Added Successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Updated Successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Moved To Trash Successfully'
    });
  } catch (error) {
    next(error)
  }
}

export const findNote = async (req, res, next) => {
  try {
    const data = await NoteService.findNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const findAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.findAllNotes(req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const findAllTrashNotes = async (req, res, next) => {
  try {
    const data = await NoteService.findAllTrashNotes(req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const findTrashNote = async (req, res, next) => {
  try {
    const data = await NoteService.findTrashNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const updateTrashNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateTrashNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Trash Status Of Note Updated'
    });
  } catch (error) {
    next(error);
  }
}

export const deleteTrashNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteTrashNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Permanently Deleted'
    });
  } catch (error) {
    next(error);
  }
}

export const findAllArchivedNotes = async (req, res, next) => {
  try {
    const data = await NoteService.findAllArchivedNotes(req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const findArchivedNote = async (req, res, next) => {
  try {
    const data = await NoteService.findArchivedNote(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}

export const updateNoteArchiveStatus = async (req, res, next) => {
  try {
    const data = await NoteService.updateNoteArchiveStatus(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note Archive Status Updated'
    });
  } catch (error) {
    next(error);
  }
}


