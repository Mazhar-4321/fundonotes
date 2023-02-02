import { Schema, model } from 'mongoose';
const tokenSchema = new Schema(
  {
    token:{
        type:String
    },
    expiry:{
        type:Number
    },
    createdTime:{
        type:Number
    }
  },
  {
    timestamps: true
  }
);
export default model('Token', tokenSchema);
