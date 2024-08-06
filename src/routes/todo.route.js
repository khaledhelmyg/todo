const express = require("express");

const { todoControllers } = require("../controllers");
const { is_auth } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .post(is_auth, todoControllers.createTodo)
  .get(is_auth, todoControllers.getAllTodos);
router
  .route("/:id")
  .get(is_auth, todoControllers.getOneTodo)
  .put(is_auth, todoControllers.updateTodo)
  .delete(is_auth, todoControllers.deleteTodo);

module.exports = router;
