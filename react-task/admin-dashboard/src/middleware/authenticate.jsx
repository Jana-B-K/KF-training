 import users from "./user"
 const authenticateUser = (data) => {
    const {email, password} = data;
    const user = users.find((user) => user.email === email);
    if(!user) throw new Error("Email not registered");
  
    const checkPassword = user.password === password;
   
    if(!checkPassword) throw new Error("Password not matched")
    return user;
  }

  export default authenticateUser;