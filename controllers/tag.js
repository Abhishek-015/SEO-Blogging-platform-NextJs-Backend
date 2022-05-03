const Tag = require("../models/tag");
const slugify = require("slugify");
const { errorHandler } = require("../helper/dbErrorHandler");

exports.create = (req, res) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();
  const tag = new Tag({ name, slug });
  tag.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Tag.find({}).exec((err, tags) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tags);
  });
};

exports.read = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Tag.findOne({ slug }).exec((err, tag) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(tag);
  });
};

exports.remove = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  Tag.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Tag deleted successfully",
    });
  });
};
