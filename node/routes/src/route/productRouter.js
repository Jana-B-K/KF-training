import {Router} from 'express'
import { products } from '../utils/constants.js'
import { getProductsById } from '../utils/middlewares.js'
import { validationResult, checkSchema, matchedData } from 'express-validator';
import {productFilterValidationSchema, createProductValidationSchema } from '../utils/validationSchema.js'
const router = Router();

router.get('/api/products',checkSchema(productFilterValidationSchema), (req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({error: result.array()})
    }
    const {filter, value } = req.query;
    console.log(filter)
    console.log(value)
    if(filter && value){
        if(products.length > 0 && !(filter in products[0])){
            return res.status(400).send({error: `${filter} is not in products object`})
        }
        const filteredProduct = products.filter((product) => product.price <= value);
        return res.send(filteredProduct);
    }

    res.send(products);
})

router.get('/api/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(404).send({msg: "product id must be number"})
    }

    const product = products.find(product => product.id === id);
    if(product){
        return res.send(product);
    }
    return res.status(404).send({msg: "Prodct not found"})
})

router.post('/api/product',checkSchema(createProductValidationSchema), (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(404).send({error: result.array()});
    }
    const data = matchedData(req);
    const nextId = ( products.length === 0 ) ? 1 : products[products.length-1].id+1;
    const newProduct = {nextId, ...data};
    products.push(newProduct);
    res.status(201).send(newProduct);  
})

router.put('/api/product/:id', getProductsById, checkSchema(createProductValidationSchema), (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({error: result.array()})
    }
    const id = parseInt(req.params.id);
    const data = matchedData(req);
    const { productIndex } = req;
    products[productIndex] = {id, ...data};
    return res.send(products);
})

router.delete('/api/product/:id', getProductsById, (req, res) => {
    const { productIndex } = req;
    products.splice(productIndex,1);
    res.send({msg: "product deleted sucessfully"})

})
export default router;