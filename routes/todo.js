const express = require('express');

const todoController = require('../controllers/todo');
const todoValidation = require('../validations/todo');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');


const router = express.Router();



router.post('/',validate(todoValidation.createTodo), authMiddleware,todoController.createTodo);


router.put('/:id',validate(todoValidation.updateTodo),authMiddleware,todoController.updateTodo);


router.delete('/:id',authMiddleware,todoController.deleteTodo);

router.get('/',authMiddleware,todoController.getTodos);

router.get('/:id',authMiddleware,todoController.getTodo);


module.exports = router;
