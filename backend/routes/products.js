const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  removeProductImage
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const productValidation = [
  body('name').isLength({ min: 2, max: 100 }),
  body('description').isLength({ min: 10, max: 2000 }),
  body('price').isFloat({ min: 0 }),
  body('category').isIn(['Electronics', 'Clothing', 'Home & Garden']),
  body('brand').notEmpty(),
  body('sku').isLength({ min: 3, max: 20 }),
  body('stock').isInt({ min: 0 })
];

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', protect, admin, upload.array('images', 5), productValidation, createProduct);
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.delete('/:productId/images/:imageId', protect, admin, removeProductImage);

module.exports = router;
