/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ message: 'User already exists' });
      const hash_password = bcrypt.hashSync(password, 10);

      const newuser = new User({
        firstName, lastName, username: Math.random().toString(), email, hash_password,
      });
      newuser.save()
        .then((data) => res.status(200).json({ message: 'User created successfully', data }))
        .catch((err) => console.log(err));
    });
});

module.exports = router;
