const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute') 
const postRoute = require('./routes/postRoute')
const putRoute = require('./routes/putRoute')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database connected sucessfully"))
    .catch((err) => 
        {console.log(err)
    })

app.use(express.json())
app.use('/auth', authRoute)
app.use('/boards',postRoute)
app.use('/boards',putRoute)



app.listen(5000, () => {
    console.log(`backend server running at port:5000`)
})