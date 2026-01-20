import express from 'express'

const app = express();
const PORT = 2000;

const users = [
    {id: 1, name: 'Jana'},
    {id: 2, name: 'Nayeem'},
    {id: 3, name: 'Nirmal'},
    {id: 4, name: 'sathish'},
    {id: 5, name: 'Nishan'},
    {id: 6, name: 'Girish'},
    {id: 7, name: 'Dhoni'},
    {id: 8, name: 'Kholi'},
]

app.get('/', (req, res) => {
    res.send("this is running")
})

app.get('/api/users', (req, res) => {
    const {key, value } = req.query;
    console.log(req.query);
    if(key && value) {
        const filteredUsers = users.filter((user) => user[key].toLowerCase().includes(value));
        return res.send(filteredUsers)
    }
    res.send(users);
})

app.get('/api/user/:id', (req, res) => {
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
 app.listen(PORT, () => { 
    console.log(`This port is listen in http://localhost:${PORT}`)
 })