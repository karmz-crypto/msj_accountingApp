const productModel = require('../model/productModel');
const mongoose = require('mongoose');

function getProductHomePage(req,res){
    res.render('product/productHome',{
        pageTitle:'Product Page'
    });
}

function addProductPage(req,res){
    res.render('product/addProductPage',{
        pageTitle:'Add Product'
    });
}

let productOperation = {
    getProductHomePage,
    addProductPage
};

module.exports = productOperation;