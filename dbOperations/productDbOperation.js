const productModel = require('../model/productModel');
const mongoose = require('mongoose');
const { countDocuments } = require('../model/productModel');

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

function addProduct(req,res){
    console.log(req.body);
    const product = new productModel({
        _id : new mongoose.Types.ObjectId(),
        itemName : req.body.itemName,
        itemPurity:req.body.itemPurity,
        purchasePurity:req.body.purchasePurity,
        salePurity:req.body.salePurity,
        purchaseLabour:req.body.purchaseLabour,
        saleLabourMax : req.body.saleLabourMax,
        saleLabourMin : req.body.saleLabourMin,
        itemRatePerPiece : req.body.itemRatePerPiece,
        inStock:req.body.inStock,
        itemWeight:req.body.itemWeight,
        itemQuantityWeight:req.body.itemQuantityWeight,
        itemQuantityNumber:req.body.itemQuantityNumber 
    });
    product.save().then(e=>{
        e.inStockQuantity = e.inStockQuantity+parseFloat(req.body.itemWeight);
        console.log(e);
        product.save().then(e=>{
            res.render('product/responsePage',{
                pageTitle:'Response Page',
                webData:e,
                responseMsg:'productAddSuccess',
                responseMsgText:'product added successfully'
            });

        }).catch();
    }).catch();
    
   /* var p2 = new Promise(function(resolve,reject){
        var query2 = productModel.find({
          itemName:req.body.itemName,
          itemPurity:req.body.itemPurity,
      });
        if (query2){resolve(query2)}else { reject(error);}
      });
      return p2;*/
     
    
}

function productExist(req){
    return productModel.exists({
        itemName:req.body.itemName,
        itemPurity:req.body.itemPurity,
        //itemRatePerPiece:req.body.itemRatePerPiece
    });
}

let productOperation = {
    getProductHomePage,
    addProductPage,
    addProduct,
    productExist
};

module.exports = productOperation;