/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec((err, user) => {
      if (err) return res.status(401).json({ message: 'Invalid user' });
      if (user) {
        const decrypted = bcrypt.compareSync(password, user.hash_password);
        if (!decrypted) return res.status(400).json({ message: 'Invalid password' });
        const token = jwt.sign({ _id: user._id }, 'HELLO', { expiresIn: '24h' });
        return res.status(201).json({ message: 'Logged in successfully', token });
      }
    });
});

module.exports = router;
