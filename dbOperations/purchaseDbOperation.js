const purchaseModel = require('../model/purchaseModel');
const mongoose = require('mongoose');

function addPurchasePage(req,res){
    res.render('purchase/addPurchase',{
        pageTitle:'Add Purchase'
    });

}

let purchaseOperation = {
    addPurchasePage
};

module.exports = purchaseOperation;