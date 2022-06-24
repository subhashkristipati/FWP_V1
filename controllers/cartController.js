const Cart = require('../model/cart')


module.exports.Cart_get = async (req,res)=>{
    if(!req.cookies.jwt_user && !req.cookies.jwt_seller){
        return res.redirect('/404')
    }
    const data = await Cart.find({}).lean()
    res.render('Cart',{data})
}

module.exports.addToCart_post = async (req,res)=>{
    const results = req.body;
    const item = await Cart.create({
        prod_id: results.productId,
        name : results.name,
        quantity : results.quantity,
        price : results.price,
        mrp : results.mrp,
        img : results.img
    }).catch(err=>console.log(err.message))

    res.redirect('/Market#product')
    // const data = await Cart.find({}).lean()
    // res.render('Cart',{data})
}




module.exports.deleteItem_post = async (req,res)=>{
    const id = req.body.id
    try {
        await Cart.findByIdAndDelete({_id: id})
        res.redirect('/Cart')
    } catch (error) {
        
    }
}