import mongoose from "mongoose";

const tackSchema = new mongoose.Schema({

  title: String,
  description: String,
  status: { 
    type: String,
    enum: ['toDo', 'doing', 'done'] 
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  assignTo: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User' 
  },
  deadline: Date,
}, 
{
timestamps: true
})
const tack = mongoose.model('tack', tackSchema)

export default tack