const getDataFromDb = require('../dbOperations/getDataFromDb');

exports.selectedProductData = (req,res)=>{
    //console.log(req.params.id);
    getDataFromDb.getSelectedProductDataApi(req.params.id,res);
};