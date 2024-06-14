const { PlaylistAddCheckOutlined } = require("@material-ui/icons");


const jwt = require("jsonwebtoken")
const Jwt_secret = "faslkfocvneofu";
const mongoose = require("mongoose")
const adminmodel = require("../model/userschema");

// in any middleware it is necessary to use 'next' otherwise it will not move to the next function 
module.exports= (req, res, next) => {
    console.log("from middleware to check admin")

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have logged in " })
    }

    const token = authorization.replace("Bearer ", "") // from the string that is coming it ignores "bearer and put remaining string in token"
    jwt.verify(token, Jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must logged in" })
        }

        const { _id } = payload;  // here 'payload' is an object , we only want to take 'id' parameter from payload object

        adminmodel.findById(_id).then(userData => {
            console.log("hi1")
            req.user = userData;
            console.log(req.user)
            next()  // next must be inside
        })
    })
}

