const purchaseOperation = require('../dbOperations/purchaseDbOperation');

exports.getPurchase = (req,res)=>{
    res.render('purchase/purchase',
        {
            pageTitle:'Purchase'
        }
    );
};

exports.getAddPurchase = (req,res)=>{
    purchaseOperation.addPurchasePage(req,res);
};