require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");

const app = express();

// middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);

// connect to db and listen to request
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
