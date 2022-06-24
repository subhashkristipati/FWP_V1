const jwt = require('jsonwebtoken')
const Seller = require('../model/seller')
const Product = require('../model/product')
const Crop = require('../model/crop')
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectId
const JWT_Secret = 'fwwp project'





module.exports.home_get = (req, res) => {
    res.render('index')
}

module.exports.about_get = (req, res) => {
    res.render('Aboutuss')
}

module.exports.cropsuggestion_get = (req, res) => {
    res.render('CropSuggestion')
}

module.exports.cropResults_post = async (req, res) => {
    const data = await Crop.find({
        soil: req.body.soilType,
        season: req.body.season,
        investment: { $lt: parseInt(req.body.investment) }
    })
    res.render('cropResults', { data: data })
}

module.exports.discussions_get = (req, res) => {
    if (!req.cookies.jwt_user && !req.cookies.jwt_seller) return res.redirect('/404')
    res.render('discussions')
}

module.exports.chatbot_get = (req, res) => {
    if (!req.cookies.jwt_user && !req.cookies.jwt_seller) return res.redirect('/404')
    res.render('ChatBot')
}

module.exports.market_get = async (req, res) => {
    if (!req.cookies.jwt_user && !req.cookies.jwt_seller) return res.redirect('/404')
    // const results = await Product.find({})
    const results = await Product.aggregate([{$sample : {size: 7}}])
    res.render('Market', { data: results })
}



module.exports.checkoutpage_get = (req, res) => {
    res.render('checkoutpage')
}

module.exports.adminportal_get = async (req, res) => {
    if (req.cookies.jwt_seller) {
        let seller = { username: "" }
        result = jwt.verify(req.cookies.jwt_seller, JWT_Secret)
        // seller = await Seller.findOne({username : result.username})
        seller = await Seller.findOne({ _id: new ObjectID(result.id) })
        return res.render('AdminPortal', { seller })
    }
    res.redirect('/404')
}


module.exports.dashboard_get = (req, res) => {
    if (req.cookies.jwt_user) return res.render('dashboard')
    res.redirect('/404')
}


module.exports.error_get = (req, res) => {
    // if(!req.cookies.jwt_user && !req.cookies.jwt_seller){
    //     return res.redirect('/')
    // }
    res.render('404')
}



module.exports.forgotPassword_get = (req, res) => {

}


module.exports.croppage_id_get = (req, res) => {
    const id = req.params.id;
    Crop.findById(id)
        .then(result => {
            res.render('croppage', { crop: result })
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.productpage_id_get = (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then(result => {
            res.render('productpage', {title: result.name, data: result })
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports.search_get = async (req, res) => {
    const query = req.params.string.toLowerCase().trim()
    try {
        // const results = await Product.find({}).lean()
        // let data = results.filter(prod => prod.category.toLowerCase() === query)
        // let data = await Product.find({name: /seeds/i})
        let data = await Product.find({name: {$regex : `${query}` ,$options : 'i'}}).lean()
        if(!data.length>0){
            data = await Product.find({category : {$regex : `${query}`,$options : 'i'}})
            // data = results.filter(prod => prod.name.toLowerCase().includes(query))
        }
        res.render('searchResults', { data })
    } catch (error) {
        console.log(error)
        res.redirect('/Market#category')
    }
}



module.exports.search_post = async (req, res) => {
    const query = req.body.query.toLowerCase()
    if(query){
        res.redirect(`/search/${query}`)
    }else{
        res.redirect('/Market')
    }
}



// export default JWT_Secret


