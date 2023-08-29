const Product = require("../models/productModel");
const mongoose = require("mongoose");

// GET ALL PRODUCT
const getProduct = async (req, res) => {
  const product = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(product);
};

// CREATE A BLOG
const createProduct = async (req, res) => {
  const { name, unit, price, expiry, inventory } = req.body;
  const image = req.file?.filename;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!unit) {
    emptyFields.push("unit");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!expiry) {
    emptyFields.push("expiry");
  }
  if (!inventory) {
    emptyFields.push("inventory");
  }
  if (!image) {
    emptyFields.push("image");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const product = await Product.create({
      name,
      unit,
      price,
      expiry,
      inventory,
      image,
    });
    res.status(200).json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// UPDATE A BLOG
const updateProduct = async (req, res) => {
  const { name, unit, price, expiry, inventory } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!unit) {
    emptyFields.push("unit");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!expiry) {
    emptyFields.push("expiry");
  }
  if (!inventory) {
    emptyFields.push("inventory");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// DELETE A BLOG
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
