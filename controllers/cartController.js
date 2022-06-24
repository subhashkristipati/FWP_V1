const Cart = require('../model/cart')
const JWT_Secret = 'fwwp project'
const jwt = require('jsonwebtoken')


module.exports.Cart_get = async (req, res) => {
    if (!req.cookies.jwt_user && !req.cookies.jwt_seller) {
        return res.redirect('/404')
    }
    let user;
    if (req.cookies.jwt_user) {
        user = jwt.verify(req.cookies.jwt_user, JWT_Secret)
    } else {
        user = jwt.verify(req.cookies.jwt_seller, JWT_Secret)
    }
    const data = await Cart.find({ user_id: user.id }).lean()
    res.render('cart', { data })
}



module.exports.addToCart_post = async (req, res) => {
    let user;
    if (req.cookies.jwt_user) {
        user = jwt.verify(req.cookies.jwt_user, JWT_Secret)
    } else {
        user = jwt.verify(req.cookies.jwt_seller, JWT_Secret)
    }

    const results = req.body;
    const it =await Cart.findOne({
        $and: [
            { user_id: user.id },
            { prod_id: results.productId }
        ]
    })
    console.log(user.id)
    console.log(results.productId)
    if (it) {
        return res.redirect('/Market');
    }
    await Cart.create({
        prod_id: results.productId,
        user_id: user.id,
        name: results.name,
        quantity: results.quantity,
        price: results.price,
        mrp: results.mrp,
        img: results.img
    }).catch(err => console.log(err.message))

    res.redirect('/Market#product')
    // const data = await Cart.find({}).lean()
    // res.render('Cart',{data})
}




module.exports.deleteItem_post = async (req, res) => {
    const id = req.body.id
    let user;
    if (req.cookies.jwt_user) {
        user = jwt.verify(req.cookies.jwt_user, JWT_Secret)
    } else {
        user = jwt.verify(req.cookies.jwt_seller, JWT_Secret)
    }
    try {
        // await Cart.findByIdAndDelete({_id: id})
        await Cart.findOneAndDelete({ _id: id, user_id: user.id })
        res.redirect('/Cart')
    } catch (error) {

    }
}