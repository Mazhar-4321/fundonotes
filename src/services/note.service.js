import Note from '../models/note.model'

export const createNote = async (note) => {
  try {
    const data = await Note.create(note)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteNote = async (req) => {
  try {
    const filter = { "_id": req.params.id, userId: req.body.userId, trash: false }
    const update = {
      trash: true
    }
    const data = await Note.findOneAndUpdate(filter, update)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findNote = async (req) => {
  try {
    const data = await Note.findOne({ "_id": req.params.id, archive: false, trash: false, userId: req.body.userId })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findAllNotes = async (userId) => {
  try {
    const data = await Note.find({ archive: false, trash: false, userId: userId })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const updateNote = async (req) => {
  try {
    const filter = { "_id": req.params.id, userId: req.body.userId }
    const update = req.body
    const data = await Note.findOneAndUpdate(filter, update)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findAllTrashNotes = async (userId) => {
  try {
    const data = await Note.find({ trash: true, userId: userId })
    return data
  } catch (err) {
    throw new Error(err)
  }
}