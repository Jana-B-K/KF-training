import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    console.log("Authenticaion middleware works")
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new  Error("Token not provided");
    }
    const token = authHeader.split(" ")[1];
    try{
        req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        next();
    }catch(err){
        next(err);
    }
}

export default authenticate;