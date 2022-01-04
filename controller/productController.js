const productDbOperation = require('../dbOperations/productDbOperation');

exports.getProductHomePage = (req,res)=>{
    productDbOperation.getProductHomePage(req,res);
};

exports.addProduct = (req,res)=>{
    productDbOperation.addProductPage(req,res);
};