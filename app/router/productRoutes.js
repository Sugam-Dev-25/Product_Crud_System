const express = require('express');
const productController = require('../controller/productController');
const multerUpload = require('../utils/Multer');

const router = express.Router();

// router.post('/create', productController.createProduct);
// router.get('/all', productController.getAllProducts);
// router.get('/product/:id', productController.getProductbyId );
// router.put('/update/:id', productController.updateProduct);
// router.delete('/delete/:id', productController.deletedProduct);
// router.get('/product', productController.getFilterProducts);

router.get('/', productController.filterProduct);
router.get('/home', productController.homePage);
router.post('/create', multerUpload.single('image'), productController.createProduct);
router.get('/edit/:id', productController.editView);
router.post('/update/:id',multerUpload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;