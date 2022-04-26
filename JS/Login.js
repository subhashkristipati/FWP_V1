// const express = require('express')
// const app = express()

// const request = require('request')


function displaySignup() {
    document.getElementsByClassName("login_div")[0].style.animation = "loginAnimation 1s ease-in-out 1";
    document.getElementsByClassName("signup_div")[0].style.animation = "signupAnimation 1s ease-in-out 1";
    document.getElementsByClassName("login_div")[0].style.display = "none";
    document.getElementsByClassName("signup_div")[0].style.display = "block";
}

function displayLogin() {
    document.getElementsByClassName("signup_div")[0].style.animation = "loginAnimation 1s ease-in-out 1";
    document.getElementsByClassName("login_div")[0].style.animation = "signupAnimation 1s ease-in-out 1";
    document.getElementsByClassName("signup_div")[0].style.display = "none";
    document.getElementsByClassName("login_div")[0].style.display = "block";

    // document.getElementsByClassName("signup_div")[0].style.animation="loginAnimation .5s linear 1";
    // setTimeout(() => {
    //     document.getElementsByClassName("signup_div")[0].style.display="none";
    //     document.getElementsByClassName("login_div")[0].style.display="block";
    //     document.getElementsByClassName("login_div")[0].style.animation="singupAnimation .5s linear 1";
    // }, 500);

}


function validateNew() {
    let email = document.querySelector(".signup-email").value;
    let name = document.querySelector(".signup-full-name").value;
    let username = document.querySelector(".signup-username-input").value;
    let password = document.querySelector(".signup-password-input").value;
    let password2 = document.querySelector(".signup-password-input-confirm").value;

    if (!email.includes('@') || !email.includes('.')) {
        alert('Enter valid email')
        return false;
    }
    else if (name.length < 10) {
        alert('Name should consist atleast 10 characters')
        return false;
    }
    else if (username.length < 8) {
        alert('Username shoul consist atleast 8 characters')
        return false;
    }
    else if (password.length < 8) {
        alert('password should consist atleast 8 characters')
        return false;
    }
    else if (password !== password2) {
        alert("Passwords doesn't match")
        return false;
    }
    return true;
}


function validateLogin() {
    let username = document.querySelector('.login-username').value
    let password = document.querySelector('.login-password').value

    if (username.length < 8) {
        alert('Username should consist atleast 8 characters')
        return false;
    }
    else if (password.length < 8) {
        alert('password should consist atleast 8 characters')
        return false;
    }
    return true;
    // return verifyLogin(username, password);
}

///////////////////////////////////////////////////////////////////////////////



const signupForm = document.getElementById('signup-form')
signupForm.addEventListener('submit', registerUser)

async function registerUser(event) {
    console.log("entered registeruser")
    event.preventDefault()
    if(validateNew()){
        let email = document.querySelector(".signup-email").value;
        let name = document.querySelector(".signup-full-name").value;
        let username = document.querySelector(".signup-username-input").value;
        let password = document.querySelector(".signup-password-input").value;
        let password2 = document.querySelector(".signup-password-input-confirm").value;

        const signupResult = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, name, username, password
            })
        }).then(res => res.json())

        // if(response.status === 'error'){
        //     alert(response.error)
        // }
        if(signupResult.status === 'error'){
            // alert(signupResult.error)
            alert('Successfully registerd!')
            window.location.href='/'
        }


        console.log(signupResult)
    }else{
        console.log("validation failed")
    }
}



const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', loginUser)

async function loginUser(event){
    event.preventDefault();
    if(validateLogin()){
        let username = document.querySelector('.login-username').value
        let password = document.querySelector('.login-password').value

        const loginResult = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => res.json())

        if(loginResult.status === 'error'){
            alert(loginResult.error)
        }else{
            // console.log(loginResult.data)
            alert('Successfully Logged in')
            window.location.href='/'
            localStorage.setItem('token', loginResult.data)
        }
        console.log(loginResult)

    }else{
        console.log('validation failed')
    }
}


async function renderLoginPage(){
    await fetch('/api/renderLoginPage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
}












////////////////////////////////////////////////////////////////////////////////

// function verifyLogin(user, password) {
//     // const express = require('express')
//     const mysql = require('mysql')

//     const db = mysql.createConnection({
//         host: 'localhost',
//         user: 'rakesh',
//         password: 'Rakesh&2002',
//         database: 'ffsd'
//     })

//     db.connect((err) => {
//         if (err) throw err;
//         console.log('Connected.....')
//     })

//     const app = express()

//     app.get('/', (req, res) => {
//         let sql = 'select * from user'
//         db.query(sql, (err, res) => {
//             if (err) throw err;
//             for (let i = 0; i < res.length; i++) {
//                 console.log(res[i].username)
//                 console.log(res[i].email)
//                 if (res[i].username === user) {
//                     if (res[i].password === password) {
//                         alert('Successfully logged in!')
//                         return true;
//                     }
//                     alert('Wrong password')
//                     return false;
//                 }
//             }
//             alert('username not found!')
//             return false;
//         })
//     })

//     app.listen('3000',()=>{
//         console.log('server is started')
//     })

//     return false;
// }