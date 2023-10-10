
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/ecommercedashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000, // Increase the timeout (in milliseconds)
});
