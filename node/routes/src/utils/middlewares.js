import users from './constants.js'
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