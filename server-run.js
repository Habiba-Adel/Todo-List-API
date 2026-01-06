//this file is for dev/prod things cause it is responsable for making the server working 
//and the other is for just making the express app

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./server');

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGOURL)
  .then(() => console.log('Connected to DB successfully'))
  .catch(err => console.log('Failed to connect to DB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});