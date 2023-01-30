import Note from '../models/note.model'
export const createNote = async (note) => {
    try {
      const data = await Note.create(note)
      return data
    } catch (err) {
      throw new Error(err)
    }
  }
  export const deleteNote=async(title)=>{
    try{
      const data = await Note.findOneAndDelete({"title":title})
      return data
    }catch(err){
        throw new Error(err)
    }
  }
  export const findNote=async(title)=>{
    try{
        const data = await Note.findOne({"title":title})
        return data
      }catch(err){
          throw new Error(err)
      }
  }
  export const findAllNotes=async()=>{
    try{
        const data = await Note.find()
        return data
      }catch(err){
          throw new Error(err)
      }
  }
  export const updateNote=async(title,description)=>{
    try{
        const filter={"title":title}
        const update={"description":description}
        const data = await Note.findOneAndUpdate(filter,update)
        return data
      }catch(err){
          throw new Error(err)
      }
  }