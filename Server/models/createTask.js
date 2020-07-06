const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  is_completed: {
    type: Boolean,
    default: false,
    required: true
  }
},
{
  timestamps:true
}
)

const Task = mongoose.model('Task', taskSchema);
module.exports = Task; 