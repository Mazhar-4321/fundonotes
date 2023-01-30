import { Schema, model } from 'mongoose'
const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String
    },
    color: {
      type: String,
    },
    archive: {
      type: Boolean
    },
    trash: {
      type: Boolean
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
export default model('Note', noteSchema)
