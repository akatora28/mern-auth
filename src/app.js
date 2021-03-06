const path = require('path')
const express = require('express')
const app = express()

// Use the .env file in development only, thanks Twilio:
// https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// CORS Setup (Cross-Origin resource sharing)
// Access-Control-Allow-Origin defaults to "*" with this setup
const cors = require('cors')
app.use(cors({credentials: true}))

// Using express.json() instead of bodyParser.json()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// MongoDB configuration
// TODO: make path OS independent
require(path.resolve('src','config','database'))

// Import Routes
app.use(require(path.resolve('src','routes')))

// Error Handling Middleware
const handleErrors = require(path.resolve('src','middleware','handleErrors'))
app.use(handleErrors)

// Use port 3001 since I'm making the assumption this api will be part
// of a MERN app and React will be running on 3000
const port = process.env.PORT || 3001

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
)