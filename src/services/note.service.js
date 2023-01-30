import Note from '../models/note.model'

export const createNote = async (note) => {
  try {
    const data = await Note.create(note)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteNote = async (id) => {
  try {
    const data = await Note.findOneAndDelete({ "_id": id })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findNote = async (id) => {
  try {
    const data = await Note.findOne({ "_id": id })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const findAllNotes = async () => {
  try {
    const data = await Note.find()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const updateNote = async (id, description) => {
  try {
    const filter = { "_id": id }
    const update = { "description": description }
    const data = await Note.findOneAndUpdate(filter, update)
    return data
  } catch (err) {
    throw new Error(err)
  }
}