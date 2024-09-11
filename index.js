const express = require('express');
const app = express();
const cors = require('cors')
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

// // Connect to MongoDB
mongoose.connect("mongodb+srv://johnkhore26:664uTcUG5tTZKKJ6@cluster0.wqtpk.mongodb.net/", {
})
.then(() => {
    console.log("Connection Successful");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


//route import and mount
const user = require("./routes/user");
const patient = require("./routes/Patients")

//1. User 
app.use(`/api/v1`, user);
app.use(`/api/v1`, patient);



app.get('/', (req, res)=>{
    res.json('HELLO WORLD')
})

app.listen(3000, ()=>{
    console.log("Server is running on port: 3000");
})






