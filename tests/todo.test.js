const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');
const Todo = require('../models/todo');

let token;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGOURL);
  }

  // Create a user and get token
  const res = await request(app)
    .post('/users/register')
    .send({ name: 'Todo User', email: 'todo@example.com', password: 'Password123' });
  token = res.body.token;
});

afterEach(async () => {
  await User.deleteMany({});
  await Todo.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo Endpoints', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy milk', description: '2 liters' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Buy milk');
  });

  it('should get todos', async () => {
    await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy eggs', description: '12 eggs' });

    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should update a todo', async () => {
    const createRes = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy bread', description: 'Whole wheat' });

    const todoId = createRes.body._id;

    const updateRes = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy bread', description: 'Sourdough' });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.description).toBe('Sourdough');
  });
});
