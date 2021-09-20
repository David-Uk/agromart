const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
