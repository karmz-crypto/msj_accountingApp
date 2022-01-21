const getDataFromDb = require('../dbOperations/getDataFromDb');

exports.selectedClientData = (req,res)=>{
    //console.log(req.params.id);
    getDataFromDb.getSelectedClientDataApi(req.params.id,res);
};