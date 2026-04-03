const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

class productController {
  async homePage(req, res) {
    const categories = Product.schema.path("category").enumValues;
    const sizes = Product.schema.path("size").enumValues;
    const colors = Product.schema.path("color").enumValues;

    return res.render("product/create", {
      categories,
      sizes,
      colors,
    });
  }

  async createProduct(req, res) {
    try {
      const { name, price, description, category, size, color, stock } =
        req.body;

      const newProduct = new Product({
        name,
        price,
        description,
        category,
        size,
        color,
        stock,
      });

      if (req.file) {
        newProduct.image = req.file.path;
      }

      await newProduct.save();

      return res.redirect("/");
    } catch (error) {
      console.log("CREATE ERROR:", error);
      return res.send(error.message);
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
        colors,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      const updateData = { ...req.body };

      if (req.file) {
        // 🔥 OLD IMAGE DELETE (SAFE)
        if (product.image) {
          try {
            const parts = product.image.split("/");
            const fileName = parts.pop();
            const folder = parts.pop();

            const publicId = `${folder}/${fileName.split(".")[0]}`;

            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.log("Cloudinary delete error:", err.message);
          }
        }

        // ✅ NEW IMAGE SAVE
        updateData.image = req.file.path;
      }

      await Product.findByIdAndUpdate(req.params.id, updateData);

      return res.redirect("/");
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      return res.send("Update failed");
    }
  }

async deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (product && product.image) {
      try {
        const parts = product.image.split("/");
        const fileName = parts.pop();
        const folder = parts.pop();

        const publicId = `${folder}/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
      }
    }


    await Product.findByIdAndDelete(req.params.id);

    return res.redirect("/");
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.send("Delete failed");
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
        colors,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new productController();
