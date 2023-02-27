const Data = require('../models/Todos')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTodos = async (req, res) => {
  const d = await Data.find({ createdBy: req.user.userId }).sort({
    updatedAt: -1,
  })
  res.status(200).json({ d, count: d.length })
}

const createTodos = async (req, res) => {
  req.body.createdBy = req.user.userId
  const d = await Data.create(req.body)
  res.status(StatusCodes.CREATED).json({ d })
}

const getTodos = async (req, res) => {
  const {
    user: { userId },
    params: { id: dataId },
  } = req
  const d = await Data.findOne({
    _id: dataId,
    createdBy: userId,
  })
  if (!d) {
    throw new NotFoundError(`No Todo with id ${dataId}`)
  }
  res.status(StatusCodes.OK).json({ d })
}

const updateTodos = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: dataId },
  } = req
  if (title === '') {
    throw new BadRequestError('Fields cannot be empty')
  }
  const updateData = await Data.findByIdAndUpdate(
    {
      _id: dataId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!updateTodos) {
    throw new NotFoundError(`No data with id ${dataId}`)
  }
  res.status(StatusCodes.OK).json({ updateData })
}

const deleteTodos = async (req, res) => {
  const {
    user: { userId },
    params: { id: dataId },
  } = req
  const d = await Data.findByIdAndRemove({
    _id: dataId,
    createdBy: userId,
  })
  if (!d) {
    throw new NotFoundError(`No Todo with id ${dataId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllTodos,
  createTodos,
  getTodos,
  updateTodos,
  deleteTodos,
}
