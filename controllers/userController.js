/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

class UserController {
  static async Signup(req, res) {
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
  }

  static async Signin(req, res) {
    const { email, password } = req.body;
    User.findOne({ email })
      .exec((err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid user' });
        if (user) {
          const decrypted = bcrypt.compareSync(password, user.hash_password);
          if (!decrypted) return res.status(400).json({ message: 'Invalid password' });
          const {
            _id, firstName, lastName, role, fullName, username,
          } = user;
          const { SECRET } = process.env;
          const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '24h' });
          return res.status(201).json({
            message: 'Logged in successfully',
            details: {
              _id, firstName, lastName, email, role, fullName, username,
            },
            token,
          });
        }
      });
  }

  static async Edit(req, res) {
    const _id = req.params.id;
    const {
      firstName, lastName, email, password,
    } = req.body;

    User.findByIdAndUpdate(_id, {
      firstName, lastName, email, password,
    }, { new: true })
      .then((prop) => {
        if (!prop) res.status(404).json({ message: 'No such user' });
        return res.status(201).json({ message: 'User updated successfully', prop });
      })
      .catch((err) => console.log(err));
  }

  static async Delete(req, res) {
    const _id = req.params.id;
    User.findByIdAndRemove(_id)
      .then((prop) => {
        if (!prop) res.status(404).json({ message: 'No such user' });
        return res.status(201).json({ message: 'User account deleted successfully', prop });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = UserController;
