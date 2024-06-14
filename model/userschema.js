


const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})



// we are hashing the password using middleware
//  userschema.pre('save', async function (next) {
//     // pre -> before saving any data of this instance to the database ,run the given function first
//     // basically this function acted as a middleware

//     if (this.isModified('password'))  // this bloack will execute only if user change password
//     {
//         this.password = await bcrypt.hash(this.password, 12); // this.password=aur coded password
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }

//     next();  // this is middleware , hence it is necessary to write next()

// })


// here we are not using fat-arrow function cause , as we want to use 'this' inside the function , and fat-arrow function does
// not work with 'this'



const usermodel = mongoose.model('usermodel', userschema);
// 'USER' -> It is shown as a collection in database
// In the program we have to use 'usermodel' to access this model

module.exports = usermodel;
