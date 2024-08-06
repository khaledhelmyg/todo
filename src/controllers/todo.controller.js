const { Todo } = require("../models");

const getAllTodos = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const todos = await Todo.find().skip(skip).limit(Number(limit)); // Limit the number of results

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// Get a single todo by ID
const getOneTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json();
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// Create a new todo
const createTodo = async (req, res, next) => {
  try {
    const { image, title, desc, priority } = req.body;
    const { _id: user } = req.user;
    const tododata = { title, desc, image, user, priority };
    const newTodo = new Todo(tododata);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
};

// Update a todo by ID
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json();
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json();
    }

    res.status(200).json(deletedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
