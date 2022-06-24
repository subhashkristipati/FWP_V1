// let mysql = require('mysql');
// let connection = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "Rakesh&2002",
//     database : "sampleCrop",
// });

// connection.connect(function(err){
//     if(err) throw err;
//     // let stmt = `insert into cropDetails values(${})`

// });

// connection.end();




// const {createPool} = require('mysql');

// const pool  =createPool({
//     host: "localhost",
//     user : "root",
//     password : "Rakesh&2002",
//     database : "sampleCrop",
//     connectionLimit: 10
// })

// pool.query(`select * from cropDetails`,(err,res)=>{
//     return console.log(res)
// })




const express = require('express')
const mysql = require('mysql')

// Create Connection with mysql account
const db = mysql.createConnection({
    host: 'localhost',
    user :'root',
    password : 'Rakesh&2002',
    database : 'ffsd' 
})

// Connect with database
db.connect((err)=>{
    if (err){
        throw err;
    }
    console.log('Mysql Connected ......')
})

const app = express()

app.get('/ex',(req,res)=>{
    let sql = 'select cropname from crop'
    db.query(sql,(err,result)=>{
        if(err) throw err;
        // res.send(result)
        console.log(result[0].cropname)
    })
})



app.listen('3000',()=>{
    console.log('server started on port 3000')
});




