const productDbOperation = require('../dbOperations/productDbOperation');

exports.getProductHomePage = (req,res)=>{
    productDbOperation.getProductHomePage(req,res);
};

exports.addProductPage = (req,res)=>{
    productDbOperation.addProductPage(req,res);
};

exports.addProduct = (req,res)=>{
    var response = productDbOperation.addProduct(req);
    
};