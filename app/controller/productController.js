const Product = require("../models/Product");

class productController {


  async homePage(req, res) {

    const categories = Product.schema.path("category").enumValues;
    const sizes = Product.schema.path("size").enumValues;
    const colors = Product.schema.path("color").enumValues;

    return res.render("product/create", {
      categories,
      sizes,
      colors
    });

  }



  async createProduct(req, res) {
    try {

      const { name, price, description, category, size, color, stock } = req.body;

      const newProduct = new Product({
        name,
        price,
        description,
        category,
        size,
        color,
        stock
      });

      await newProduct.save();

      return res.redirect("/api/all");

    } catch (error) {
      console.log(error);
    }
  }



  async editView(req, res) {
    try {

      const product = await Product.findById(req.params.id);

      const categories = Product.schema.path("category").enumValues;
      const sizes = Product.schema.path("size").enumValues;
      const colors = Product.schema.path("color").enumValues;

      return res.render("product/edit", {
        product,
        categories,
        sizes,
        colors
      });

    } catch (error) {
      console.log(error);
    }
  }



  async updateProduct(req, res) {
    try {

      await Product.findByIdAndUpdate(req.params.id, req.body);

      return res.redirect("/api/all");

    } catch (error) {
      console.log(error);
    }
  }



  async deleteProduct(req, res) {
    try {

      await Product.findByIdAndDelete(req.params.id);

      return res.redirect("/api/all");

    } catch (error) {
      console.log(error);
    }
  }

  
  async filterProduct(req, res) {
    try {

      const filter = {};

      if (req.query.category) filter.category = req.query.category;
      if (req.query.size) filter.size = req.query.size;
      if (req.query.color) filter.color = req.query.color;

      const products = await Product.find(filter);

      const categories = Product.schema.path("category").enumValues;
      const sizes = Product.schema.path("size").enumValues;
      const colors = Product.schema.path("color").enumValues;

      return res.render("product/list", {
        products,
        categories,
        sizes,
        colors
      });

    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new productController();