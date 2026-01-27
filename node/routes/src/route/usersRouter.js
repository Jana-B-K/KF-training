import { Router } from 'express';
import { validationResult, matchedData, checkSchema } from 'express-validator';
import { createValidationSchema, filterValidationSchema } from '../utils/validationSchema.js';
import { getUserById, requireAuth } from '../utils/middlewares.js';
import { users } from '../utils/constants.js';
import { User } from '../mongoose/schemas/user.js';
import { hashPassword } from '../utils/helper.js';

const router = Router();

// Public route - Create new user (registration)
router.post('/api/users', checkSchema(createValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req);
    data.password = hashPassword(data.password);

    try {
        const savedUser = await User.create(data);
        const userResponse = await User.findById(savedUser._id).select('-password');
        res.status(201).send(userResponse);
    } catch (err) {
        
        console.log(err)
        if (err.code === 11000) {
            return res.send( await User.findOne(data))
            return res.status(400).send({ msg: "Username already exists" });
        }
        res.status(400).send({ msg: "Error creating user" });
    }
});

// Apply authentication middleware to all routes below this line
// router.use(requireAuth);

// Protected routes - all require authentication

// Get all users
router.get('/api/users', checkSchema(filterValidationSchema), async (req, res) => {

    const result = validation(req);
    if(!result.isEmpty()){
        return res.status(400).send({ errors : result.array() })
    }
    const { username, age } = matchedData(req);
    
    try {
        let query = {};
        
        if (username) query.username = username;  // Exact match
        if (age) query.age = parseInt(age);       // Exact match
        
        const foundUsers = await User.find(query).select('-password');
        res.send(foundUsers);
    } catch (err) {
        res.status(500).send({ msg: "Error fetching users" });
    }
});

// Get user by ID
router.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const findUser = await User.findById(id).select('-password');
        if (!findUser) {
            return res.status(404).send({ msg: "User not found" });
        }
        res.send(findUser);
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: "Invalid user ID" });
    }
});

// Update user
router.put('/api/user/:id', checkSchema(createValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    
    const id = req.params.id;
    const data = matchedData(req);
    
    if (data.password) {
        data.password = hashPassword(data.password);
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" });
        }
        
        return res.status(200).send({ msg: "User updated", user: updatedUser });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send({ msg: "Username already exists" });
        }
        return res.status(400).send({ msg: "Error updating user" });
    }
});

// Delete user
router.delete('/api/user/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).send({ msg: "User not found" });
        }
        
        res.send({ msg: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: "Error deleting user" });
    }
});

export default router;