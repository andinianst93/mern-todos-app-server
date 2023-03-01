const mongoose = require('mongoose')

const TodosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'must provide text'],
      trim: true,
      maxlength: 250,
    },
    description: {
      type: String,
      required: [true, 'must provide text'],
      trim: true,
      maxlength: 1000,
    },
    status: {
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

module.exports = mongoose.model('Data', TodosSchema)
