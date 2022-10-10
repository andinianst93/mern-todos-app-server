const Todos = require('../models/Todos')

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find({})
    res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createTodos = async (req, res) => {
  try {
    const todos = await Todos.create(req.body)
    res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getTodos = async (req, res) => {
  try {
    const { id: todosID } = req.params
    const todos = await Todos.findOne({ _id: todosID })
    if (!todos) {
      return res.status(404).json({ msg: `No task with id: ${todosID}` })
    }
    return res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateTodos = async (req, res) => {
  try {
    const { id: todosID } = req.params
    const todos = await Todos.findOneAndUpdate({ _id: todosID }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!todos) {
      return res.status(404).json({ msg: `No task with id: ${todosID}` })
    }
    return res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteTodos = async (req, res) => {
  try {
    const { id: todosID } = req.params
    const todos = await Todos.findOneAndDelete({ _id: todosID })
    if (!todos) {
      return res.status(404).json({ msg: `No task with id: ${todosID}` })
    }
    return res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTodos,
  createTodos,
  getTodos,
  updateTodos,
  deleteTodos,
}
