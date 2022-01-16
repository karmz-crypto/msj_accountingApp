const purchaseModel = require('../model/purchaseModel');
const clientModel = require('../model/clientsModel');
const productModel = require('../model/productModel');
const dataFromDb = require('../dbOperations/getDataFromDb');
const mongoose = require('mongoose');

function addPurchasePage(req,res){
    // it will require client and product data 
    var client = dataFromDb.getCompleteClientData();
    var product = dataFromDb.getCompleteProductData();
    Promise.all([client,product])
    .then(result=>{
        res.render('purchase/addPurchase',{
            pageTitle:'Add Purchase',
            clientData:result[0],
            productData:result[1]
            }
        );
    })
    .catch();
}

function addPurchase(req,res){
    console.log(req.body);

}

let purchaseOperation = {
    addPurchasePage,
    addPurchase
};

module.exports = purchaseOperation;