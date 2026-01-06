const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGOURL);
  }
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Endpoints', () => {
  it('should register a new user and return a token', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail if email already exists', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123' });

    const res = await request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'Password123' });

    expect(res.statusCode).toBe(400);
  });

  it('should login with correct credentials', async () => {
    await request(app)
      .post('/users/register')
      .send({ name: 'Login User', email: 'login@example.com', password: 'Password123' });

    const res = await request(app)
      .post('/users/login')
      .send({ email: 'login@example.com', password: 'Password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
