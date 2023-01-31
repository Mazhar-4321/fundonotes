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
      message: 'Note Deleted Successfully'
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


