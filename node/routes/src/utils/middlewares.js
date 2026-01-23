import {users, products} from './constants.js'

// Session validation middleware
export const requireAuth = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({msg: "Unauthorized. Please login first."});
    }
    next();
}

export const getUserById = (req, res, next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
        return res.status(400).send({msg: "Invalid user ID"}) 
    }
    const userIndex = users.findIndex((user) => user.id === id);
    if(userIndex === -1){
        return res.status(404).send({msg: "User not found"})
    }
    req.userIndex = userIndex;
    next();
}

export const getProductsById = (req, res, next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg: "Invalid product ID"})
    }
    const productIndex = products.findIndex((product) => product.id === id);
    if(productIndex === -1){
        return res.status(404).send({msg: "Product not found"})
    }
    req.productIndex = productIndex;
    next();
}