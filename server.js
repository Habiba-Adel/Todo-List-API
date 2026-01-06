const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes=require('./routes/user');
const todoRoutes=require('./routes/todo');
const rateLimit=require('express-rate-limit');//and this is very important in the part of security cause it specifiy how many requests we can get and allow from each user in speficic time which prevents DOS
const app = express();

// Common middleware
app.use(express.json()); // parse JSON request bodies
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: { error: 'Too many requests, please try again later.' }
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// Routes would go here, for example:
 app.use('/users', userRoutes);
 app.use('/todos', todoRoutes);

 module.exports = app;
