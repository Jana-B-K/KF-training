import express from 'express'
import userRouter from './route/usersRouter.js'
import productRouter from './route/productRouter.js'
const app = express();
const PORT = 2000;
app.use(express.json());
app.use(userRouter)
app.use(productRouter)


app.get('/', (req, res) => {
    console.log(req)
     res.send("Hello");

})


 app.listen(PORT, () => { 
    console.log(`This port is listen in http://localhost:${PORT}`)
 })