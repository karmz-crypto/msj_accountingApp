const clientModel = require('../model/clientsModel');
const productModel = require('../model/productModel');

function getCompleteClientData(){
    return clientModel.find().exec();
}

function getCompleteProductData(){
    return productModel.find().exec();
}

function getSelectedClientData(id){
    return clientModel.findById(id).exec();
}

function getSelectedProductData(id){
    return productModel.findById(id).exec();
}

function getSelectedClientDataApi(){
    //return clientModel.find().exec();
}

function getSelectedProductDataApi(id,res){
    productModel.findById(id).then(e=>{
        res.send(e)
    }).catch(err=>{res.send(err)});
}


let dataFromDb ={
    getCompleteClientData,
    getCompleteProductData,
    getSelectedClientData,
    getSelectedProductData,
    getSelectedProductDataApi
};

module.exports = dataFromDb;