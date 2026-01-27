export const users = [
    {id: 1, name: 'Jana', age: 22, password: "1234"},
    {id: 2, name: 'Nayeem', age: 20, password: "2341"},
    {id: 3, name: 'Nirmal', age: 23, password: "1122"},
    {id: 4, name: 'sathish', age: 22, password: "2233"},
    {id: 5, name: 'Nishan', age: 21, password: "12314"},
    {id: 6, name: 'Girish', age: 24, password: "123412"},
  
]
export const products = [
    {id: 1, name: 'Laptop', price: 5000},
    {id: 2, name: 'Mobile', price: 2000},
    {id: 3, name: 'Tablet', price: 1500},
    {id: 4, name: 'Watch', price: 4000},
    {id: 5, name: 'Headphones', price: 3000}
]

// app.use(session({
//    secret: "this is secret",
//    saveUninitialized: false,
//    resave: false,
//    cookie: {
//       maxAge: 60000 * 60, // 1 hour
//    },
//    store: MongoStore.create({
//       client: mongoose.connection.getClient()
//    })
// }))