/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const slugify = require('slugify');

const Category = require('../models/categories');

class CategoryController {
  async createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) category = categories.filter((cat) => cat.parentId === undefined);
    else {
      category = categories.filter((cat) => cat.parentId === parentId);
    }
    for (const cat of category) {
      categoryList.push({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        children: this.createCategories(categories, cat._id),
      });
    }
    return categoryList;
  }

  static async AddCategory(req, res) {
    const catObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };

    if (req.body.parentId) {
      catObj.parentId = req.body.parentId;
    }
    const cat = new Category(catObj);
    cat.save((err, category) => {
      if (err) return res.status(400).json({ err });
      if (category) {
        return res.status(201).json({ category });
      }
    });
  }

  static async GetCategories(req, res) {
    Category.find()
      .exec((err, categories) => {
        if (err) return res.status(400).json({ err });
        if (categories) {
          const categoryList = this.createCategories(categories);
          return res.status(200).json({ categoryList });
        }
      });
  }
}

module.exports = CategoryController;
