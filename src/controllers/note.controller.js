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
};
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params.title, req.body.description);
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
    const data = await NoteService.deleteNote(req.params.title);
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
    const data = await NoteService.findNote(req.params.title);
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
    const data = await NoteService.findAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    next(error)
  }
}


