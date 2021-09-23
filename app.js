const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
