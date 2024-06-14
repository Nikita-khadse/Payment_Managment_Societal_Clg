


const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");


const recordschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
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
    designation: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        // required:true
    }
    ,
    check_loan:{
        type:Boolean,
        required:true
    },
    subscription:{
        type:Number
    },
    loan_type:{
        type:String
    },
    amount:{
        type:Number
    },
    salary:{
        type:Number,
        required:true
    },
    rate:{
        type:Number
    },
    duration:{
        type:Number
    },
    loan_acceptance_date:{
        type:Date
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



const recordmodel = mongoose.model('Record', recordschema);
// 'USER' -> It is shown as a collection in database
// In the program we have to use 'usermodel' to access this model

module.exports = recordmodel;
