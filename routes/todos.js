const express = require('express')
const router = express.Router()

const {
  getAllTodos,
  createTodos,
  getTodos,
  updateTodos,
  deleteTodos,
} = require('../controllers/todos')

router.route('/').get(getAllTodos).post(createTodos)
router.route('/:id').get(getTodos).patch(updateTodos).delete(deleteTodos)

module.exports = router
