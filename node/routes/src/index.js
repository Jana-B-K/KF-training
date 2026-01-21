import express from 'express'
import userRouter from './route/usersRouter.js'
const app = express();
const PORT = 2000;
app.use(express.json());
app.use(userRouter)



app.get('/', (req, res) => {
    console.log(req)
     res.send("Hello");

})


 app.listen(PORT, () => { 
    console.log(`This port is listen in http://localhost:${PORT}`)
 })