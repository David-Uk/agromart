/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');

dotenv.config();

const app = express();
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
