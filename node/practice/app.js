import express from "express"
import { fileURLToPath } from "url";
import path from "path";
import morgan from 'morgan'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;

app.use(morgan('combined'))

app.use((req, res, next ) => {
    console.log("Middleware");
    next(); 
})



app.get("/", (req,res) => {
    res.sendFile('./home.html', {root: __dirname})
})

app.get("/about", (req,res) => {
    res.sendFile('./about.html', {root: __dirname})
})

// Add before app.listen()
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});