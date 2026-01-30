const roleBasedAuthentication = (role = ["Admin"]) => {
   console.log("rolebased middle ware")
    return (req, res, next) => {
         console.log(req.user.role)
        if(!role.includes(req.user.role)){
            return res.status(403).send({
                message: "Access forbidden"
            })
        }
         console.log("rolebased middle ware")
        next();
    }
}

export default roleBasedAuthentication;