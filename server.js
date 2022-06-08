const express = require('express')
// const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const Crop = require('./model/crop')
const Product = require('./model/product')
const Seller = require('./model/seller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Cart = require('./model/cart')
const port = 9999

const JWT_SECRET = 'aorkdaoeubboirgdroue2xb3rcgtntmckhoeu'


// mongoose.connect("mongodb://localhost:27017/db")


const app = express()
const dbURL = 'mongodb+srv://FFSD1:ffsd1@ffsd1.ooswv.mongodb.net/Data?retryWrites=true&w=majority'
mongoose.connect(dbURL)
        .then((res) => app.listen(port, () => { console.log(`listening at ${port}\nhttp://localhost:9999/`)}))
        .catch((err) => {console.log(err)})


// app.use(express.static(path.join(__dirname, '.')))
app.use(express.static(__dirname+'/'))
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())
app.set('view engine','ejs');

app.post('/api/register', async(req, res) => {
    console.log(req.body)

    const { email, name, username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 8)

    try{
        const response = await User.create({
            username: username,
            email: email,
            name: name,
            password: hashedPassword
        })
        // console.log(response)
    } catch(error) {
        console.log(error)
        return res.json({ status: 'error' })
    }

    res.json({ status: 'ok'})
})

app.post('/api/login', async(req, res) => {
    const {username, password } = req.body
    const user = await User.findOne({username}).lean()

    if(!user){
        return res.json({ status: 'error', error: 'Invalid username/password'})
    }

    if(!user){
        const seller = await Seller.findOne({username}).lean()
        if(seller){
            if(await bcrypt.compare(password, seller.password)){
                const token = jwt.sign({id: seller._id, username: seller.username}, JWT_SECRET)
                return res.json({status: 'ok', type:'seller', data: token})
            }
        }else{
            return res.json({ status: 'error', error: 'Invalid username/password'})
        }
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET)
        return res.json({status: 'ok', data: token})
    }
})


app.post('/api/renderLoginPage', async(req, res) => {
    const { token } = req.body
    const person = jwt.verify(token, JWT_SECRET)
    const username = person.username
    const user = await User.findOne({username: username}).select('username name')
    if(!user){
        const seller = await Seller.findOne({username}).select('_id username email name products')
        console.log(seller)
        if(seller) res.render('adminPortal', {seller})
    }else{
        console.log("User details: ----------------")
        console.log(user)
        res.render('index')
        // console.log("hiii")
    }
    // console.log(person)
})


app.get('/',(req,res)=>{
    // Product.create()
    res.render('index')
})

app.get('/Aboutuss',(req,res)=>{
    res.render('Aboutuss')
})

app.get('/CropSuggestion',(req,res)=>{
    res.render('CropSuggestion')
})


app.post('/Resultspage',async (req,res)=>{
    // const data = await Crop.find({soil: req.body.soilType , season: {tags: [req.body.season]}, investment : {$lt : parseInt(req.body.investment)}})
    const data = await Crop.find({soil: req.body.soilType , season: req.body.season, investment : {$lt : parseInt(req.body.investment)}})
    // const data = await Crop.find({soil: req.body.soilType , season: {"$in" : [req.body.season]}, investment : {$lt : parseInt(req.body.investment)}})
                            // .select("_id name soil season investment waterReq profit brief info img")
    res.render('Resultspage' , {data : data})
    
})


app.get('/discussions',(req,res)=>{
    res.render('discussions',)
})


app.get('/ChatBot',(req,res)=>{
    res.render('ChatBot')
})

// app.get('/Market', async(req,res)=>{
//     const product = await Product.find({}).select('_id name mrp price img1')
//     // console.log(product)
//     res.render('Market', {product})
// })

app.get('/Market',async (req,res)=>{
    const results = await Product.find({})
    res.render('Market',{data: results})
})


app.get('/Aboutuss',(req,res)=>{
    res.render('Aboutuss')
})


app.get('/Login',(req,res)=>{
    res.render('Login')
})



app.get('/croppage/:id',(req,res)=>{
    const id = req.params.id;
    Crop.findById(id)
        .then(result =>{
            res.render('croppage',{crop: result})
        })
        .catch(err=>{
            console.log(err)
        })
})


app.get('/productpage/:id',(req,res)=>{
    const id = req.params.id
    Product.findById(id)
            .then(result=>{
                res.render('productpage',{data: result})
            })
            .catch(err=>{
                console.log(err)
            })
})


app.get('/search/:str', async(req,res)=>{
    const str = req.params.str
    let product = await Product.find({category: {$regex:str, $options:'i'}}).select('_id name mrp price img1')
    // console.log(product)
    res.render('results', {product})
})

app.get('/search-all', async(req,res)=>{
    console.log(req.body)
    const str = String(req.body.searchQuery).toLowerCase()
    // console.log("yes coming")
    // const dataByName = await Product.find({name: {$regex:str, $options:'i'}}, function(err, product){
    //     if(err) console.log(err)
    // }).select('_id name mrp price img1')
    // const dataByDescrip = await Product.find({description: {$regex:str, $options:'i'}}).select('_id name mrp price img1')
    let product = []
    product = await Product.find({ $or: [{ name: {$regex:str, $options:'i'}}, { description: {$regex:str, $options:'i'}}] }, function(err, product){
        if(err) console.log(err)
    }).select('_id name mrp price img1')
    // console.log(dataByName.length)
    // for(let i=0;i<dataByName.length;i++){
    // if(product.indexOf(dataByName[i]) == -1)
    //    product.push(dataByName[i])
    // }
    // for(let i=0;i<dataByDescrip.length;i++){
    //     if(product.indexOf(dataByDescrip[i]) == -1)
    //         product.push(dataByDescrip[i])
    // }
    // const product = dataByName.concat(dataByDescrip)
    res.render('results', {product})
    // console.log("yes coming")
    console.log(product)
})

app.get('/productpage/:id',async (req,res)=>{
    const id = req.params.id
    const data = await Product.find({_id : id})
    res.render('productpage',{data : data})
})


app.get('/checkoutpage',(req,res)=>{
    res.render('checkoutpage')
})



app.post('/addToCart',(req,res)=>{
    // console.log(req.body)
    if(!Cart.findById(req.body._id)){
        Cart.create(
            {
                _id: req.body.productId,
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.quantity*req.body.price
            })
    }else{
        console.log('Item already in cart')
    }

    Cart.find({}).then(result=>{
        res.render('cart',{data: result})
    })
})


// app.get('/Resultspage',(req,res)=>{
//     res.render('Resultspage')
// })


// app.listen(9999, () => {
//     console.log('listening at 9999')
// })
