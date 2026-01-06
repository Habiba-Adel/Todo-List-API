
const Todo = require('../models/todo');
const mongoose = require('mongoose');

//in the last previous project i use another different way that i am trying to make exports with all functions names
//in the end of the file after defining all of them but this is another more better way to when defing the function itself 
//make it is exports as it as to make the things more easier

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await Todo.create({
      title,
      description,
      author: req.user._id // and that cause in the auth middleware after veriying we put the user things (his payloads) inside the request
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the todo
    const todo = await Todo.findById(id);
    //and it is a bad request
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // checking the authorization
    if (!todo.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden: You cannot update this todo' });
    }

    // Update fields if provided
    //the stricted equal here is more better rather than using the normal equal
    //and we check about this cause they can be null and that cause in the validation we make them optional and that casue
    //the user not forced to update the whole attributes so that means they are optionl
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;

//dividing the step into 2 operations more better cause this will ensure that we will not update the document in teh database
//until we ensure that we donot violate any of this previous things cause if we use the findbyid and update it will update and then check and that not correct

    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    // Check author
    if (!todo.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden: You cannot delete this todo' });
    }
//the same thing here 
    await todo.deleteOne();

    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get paginated list of todos through patches 
//here we get all the todos this user write them
exports.getTodos = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Todo.countDocuments({ author: req.user._id });
//return the whole todos that their author equals the id object is in teh request
    const todos = await Todo.find({ author: req.user._id })
      .skip((page - 1) * limit)//skip x items cause we sent them before
      .limit(limit)//just give me from the new ones this limit number
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: todos,
      page,
      limit,
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single todo from the whole todos this user make based on specific id was sent through the request
exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    if (!todo.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden: You cannot view this todo' });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
