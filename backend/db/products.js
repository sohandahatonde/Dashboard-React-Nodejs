const mongoose = require ('mongoose');
 
const ProductSchema = new mongoose.Schema({
    name:String,
    email:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports = mongoose.model('products',ProductSchema);