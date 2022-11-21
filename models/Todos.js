const mongoose = require('mongoose')

const TodosSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, 'must provide text'],
      trim: true,
      maxlength: [50, 'text can not be more than 50 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Todo', TodosSchema)
