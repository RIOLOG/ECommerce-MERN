const express = require('express');
const cors = require("cors");
const app = express();
require('./db/config');
const Product = require('./db/Product');
const User = require('./db/User');
const Jwt  = require('jsonwebtoken');
const jwtKey = 'ankit';




//middleware
app.use(express.json());
app.use(cors());

app.post("/register" , async(req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token) => {
        if (err)
        {
            res.send({result:"Something went Wrong"});
        }
        res.send({result, auth:token});
    })
});


app.post("/login", async(req, res) => {
        let user = await User.findOne(req.body).select("-password");
        if (user)
        {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token) => {
                if (err)
                {
                    res.send({result:"Something went Wrong"});
                }
                res.send({user, auth:token});
            })
        }
        else{
            res.send({result:'No Result Found'});
        }
})


app.post("/add-product", async(req ,res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})


app.get("/products", async(req, res) => {
    let products = await Product.find();
    if (products.length > 0)
    {
        res.send(products);
    }
    else
    {
        res.send({result:"No Product Found"});
    }
})


app.delete("/product/:id" , async (req, res) => {
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})


app.get("/product/:id", async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if (result)
    {
        res.send(result);
    }
    else
    {
        res.send({result:"No result Found"});
    }
})


app.put("/product/:id", async(req, res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
})


app.get("/search/:key" ,verifyToken,  async(req, res) => {
    let result = await Product.find({
        "$or":[
            {name:{$regex: req.params.key}},
            {company:{$regex: req.params.key}},
            {category:{$regex: req.params.key}}
        ]
    });
    res.send(result);
});


//verify jet TOKEN
function verifyToken(req, res, next)
{
    let token = req.headers['authorization'];
    if(token)
    {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=> {
            if (err)
            {
                res.send({result:"Please valid token with header"});
            }
            else
            {
                next();
            }
        })
    }
    else
    {
        res.send({result:"Please add token with header"});
    }
    next();
}













app.listen(5000);