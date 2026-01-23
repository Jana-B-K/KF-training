import { Router } from 'express';
import { validationResult, matchedData, checkSchema } from 'express-validator';
import { createProductValidationSchema, productFilterValidationSchema } from '../utils/validationSchema.js';
import { getProductsById, requireAuth } from '../utils/middlewares.js';
import { products } from '../utils/constants.js';

const router = Router();

// Apply authentication middleware to ALL product routes
router.use(requireAuth);

// Get all products with optional filtering
router.get('/api/products', checkSchema(productFilterValidationSchema), (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    
    const { filter, value } = req.query;
    
    if (filter && value) {
        const filteredProducts = products.filter((product) => {
            const productValue = product[filter];
            return productValue && productValue.toString().toLowerCase().includes(value.toLowerCase());
        });
        
        return res.send(filteredProducts);
    }
    
    res.send(products);
});

// Get product by ID
router.get('/api/product/:id', getProductsById, (req, res) => {
    const { productIndex } = req;
    res.send(products[productIndex]);
});

// Create new product
router.post('/api/products', checkSchema(createProductValidationSchema), (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    
    const data = matchedData(req);
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        ...data
    };
    
    products.push(newProduct);
    return res.status(201).send(newProduct);
});

// Update product
router.put('/api/product/:id', getProductsById, checkSchema(createProductValidationSchema), (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    
    const id = parseInt(req.params.id);
    const data = matchedData(req);
    const { productIndex } = req;
    
    products[productIndex] = { id: id, ...data };
    return res.status(200).send({ msg: "Product updated", product: products[productIndex] });
});

// Delete product
router.delete('/api/product/:id', getProductsById, (req, res) => {
    const { productIndex } = req;
    const deletedProduct = products.splice(productIndex, 1);
    res.send({ msg: "Product deleted successfully", product: deletedProduct[0] });
});

export default router;