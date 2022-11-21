const Todos = require('../models/Todos')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTodos = async (req, res) => {
  const todos = await Todos.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )
  res.status(200).json({ todos, count: todos.length })
}

const createTodos = async (req, res) => {
  req.body.createdBy = req.user.userId
  const todos = await Todos.create(req.body)
  res.status(StatusCodes.CREATED).json({ todos })
}

const getTodos = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req
  const todo = await Todos.findOne({
    _id: todoId,
    createdBy: userId,
  })
  if (!todo) {
    throw new NotFoundError(`No Todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ todo })
}

const updateTodos = async (req, res) => {
  const {
    body: { todo },
    user: { userId },
    params: { id: todoId },
  } = req
  if (todo === '') {
    throw new BadRequestError('Todo fields cannot be empty')
  }
  const updateTodos = await Todos.findByIdAndUpdate(
    {
      _id: todoId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!updateTodos) {
    throw new NotFoundError(`No Todo with id ${todoId}`)
  }
  res.status(StatusCodes.OK).json({ updateTodos })
}

const deleteTodos = async (req, res) => {
  const {
    user: { userId },
    params: { id: todoId },
  } = req
  const todo = await Todos.findByIdAndRemove({ _id: todoId, createdBy: userId })
  if (!todo) {
    throw new NotFoundError(`No Todo with id ${todoId}`)
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
