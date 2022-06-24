const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const {checkUser} = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes')

const app = express()

// middleware
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())

app.set('view engine','ejs')


// database connectivity
const dbURI = 'mongodb://localhost:27017/ffsd1'
// const dbURI = 'mongodb+srv://FFSD1:ffsd1@ffsd1.ooswv.mongodb.net/Data?retryWrites=true&w=majority'

const port = process.env.PORT || 9999        
mongoose.connect(dbURI)
        .then(app.listen(port,(err)=>{
                console.log(`http://localhost:${port}/`)
        }))
        .catch((err)=> console.log(err))



// routes

app.get('*',checkUser)
app.post('*',checkUser)
app.use(authRoutes)


