import { Router } from 'express';
import {query, validationResult, matchedData, checkSchema} from 'express-validator'
import { createValidationSchema } from '../utils/createValidationSchema.js'
import {getUserById} from '../utils/middlewares.js'
import users  from '../utils/constants.js'
const router = Router();

router.get(
    '/api/users',
    [
        query("key")
            .optional() // Make it optional since filtering is optional
            .isString()
            .withMessage("Key must be a string")
            .notEmpty()
            .withMessage("Key must not be empty")
            .isLength({ min: 3, max: 10})
            .withMessage("Key must be 3-10 characters"),
        query("value")
            .optional() // Make it optional
            .isString()
            .withMessage("Value must be a string")
            .notEmpty()
            .withMessage("Value must not be empty")
            .isLength({ min: 1, max: 50})
            .withMessage("Value must be 1-50 characters")
    ],
    (req, res) => {
        const result = validationResult(req);
        
        // Check if validation failed
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }
        
        const { key, value } = req.query;
        
        if (key && value) {
            // Check if the key exists in user objects
            if (users.length > 0 && !(key in users[0])) {
                return res.status(400).send({ 
                    msg: `Invalid key: ${key}. Valid keys are: ${Object.keys(users[0]).join(', ')}` 
                });
            }
            
            const filteredUsers = users.filter((user) => {
                const userValue = user[key];
                // Handle both string and number fields safely
                return userValue && userValue.toString().toLowerCase().includes(value.toLowerCase());
            });
            
            return res.send(filteredUsers);
        }
        
        res.send(users);
    }
);

router.get('/api/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(404).send({msg: "User NOT FOUND"})
    }
    const user = users.find((user) => user.id === id);
    if(user){
        return res.send(user);
    }
    res.status(404).send({msg: "User not found"})
})

router.post('/api/users', checkSchema(createValidationSchema), (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    
    const data = matchedData(req);
    const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = {id: nextId, ...data};
    users.push(newUser);
    
    return res.status(201).send(newUser);
})

router.put('/api/user/:id',getUserById, checkSchema(createValidationSchema), (req, res) => {
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(404).send({ error: result.array() })
    }
    const id = parseInt(req.params.id);
    const data = matchedData(req);
    console.log(data)
    const {userIndex} = req;
    
    users[userIndex] = {id: id, ...data};
    return res.status(201).send({msg: "User updated"})
})

router.delete('/api/user/:id', getUserById, (req, res) => {
    const { userIndex } = req;
    users.splice(userIndex,1);
    res.send({msg: "User deleted sucessfully"})
})

export default router;