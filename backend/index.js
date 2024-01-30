const express = require ('express');
require('./db/config');
const User = require ('./db/User');
const Product = require ('./db/products');
const cors = require ('cors');
const products = require('./db/products');
const app = express();

const jwt = require('jsonwebtoken')
const jwtKey='e-comm'

app.use(express.json());
app.use(cors());
app.post('/register',async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
         resp.send({result:"something went wrong , please try after sometime"})
        }
         resp.send({result,auth:token});
     })
})

app.post("/login", async (req,resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email)
    {
        let user =await User.findOne(req.body).select('-password')
        if (user) {
            jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
               if(err){
                resp.send({result:"something went wrong , please try after sometime"})
               }
                resp.send({user,auth:token});
            })
    
        }else{
            resp.send({result:'No User Found'})
        }
    }else{
        resp.send({result:'No User Found'})
    }
  
})

app.post("/add-product",verifyToken,async (req,resp)=>{
  
     let product = new Product(req.body);
     let result = await product.save();
     resp.send(result);
})
app.get('/products',verifyToken,async(req,resp)=>{
    let products = await Product.find();
    if (products.length>0) {
        resp.send(products)
    }else{
        resp.send({result:"no product Found"})
    }
})
app.delete("/product/:id",verifyToken,async (req,resp)=>{
    // resp.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})
app.get("/product/:id",verifyToken,async (req,resp)=>{
    let result = await Product.findOne({ _id:req.params.id})
    if (result) {
      resp.send(result);
    }else{
        resp.send({result:"No Record Found..!"})
    }
})
app.put('/product/:id',verifyToken,async (req,resp)=>{
   let result = await Product.updateOne(
     {_id: req.params.id},
     {
      $set:req.body
     }
   )
   resp.send(result)
});

// ^ Search Api 
app.get('/search/:key',verifyToken,async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}, 
            {company:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

function verifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token,jwtKey, (err, valid)=>{
            if (err) {
                resp.status(401).send({result:"please Provide valid token"})
            }else{
                   next();
            }
        })
    }else{
       resp.status(401).send({result:"please add token with header"})
    }
}
app.listen(5000);


