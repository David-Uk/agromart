/* eslint-disable consistent-return */
const shortid = require('shortid');
const slugify = require('slugify');

const Product = require('../models/products');

class ProductController {
  static async CreateProduct(req, res) {
    const {
      name, price, description, category, quantity, createdBy,
    } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
      productPictures = req.files.map((file) => ({ img: file.filename }));
    }
    const product = new Product({
      name,
      slug: slugify(name),
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
    });

    product.save((error, prod) => {
      if (error) return res.status(400).json({ error });
      if (prod)res.status(201).json({ prod });
    });
  }
}

module.exports = ProductController;
