const clientModel = require('../model/clientsModel');
const productModel = require('../model/productModel');

//client data

function getCompleteClientData(){
    return clientModel.find().exec();
}

function getSelectedClientData(id){
    return clientModel.findById(id).exec();
}


//client data end

//client data api
function getSelectedClientDataApi(id,res){
    clientModel.findById(id).then(
        e=>{
            res.send(e);
        }
    ).catch(err=>{res.send(err)});
}

function getCompleteClientDataApi(res){
    clientModel.find().then(
        e=>{
            res.send(e);
        }
    ).catch();
}

//client data api ends
// product data
function getCompleteProductData(){
    return productModel.find().exec();
}



function getSelectedProductData(id){
    return productModel.findById(id).exec();
}

// product data ends

//product data api


function getSelectedProductDataApi(id,res){
    productModel.findById(id).then(e=>{
        res.json(e) //res.send(e);
    }).catch(err=>{res.send(err)});
}

function getCompleteProductDataApi(res){
    productModel.find().then(
        e=>{
            res.json(e); //res.send(e);
        }
    ).catch();
}

//product data api ends


let dataFromDb ={
    getCompleteClientData,
    getSelectedClientData,
    getCompleteProductData,
    getSelectedProductData,
    //api functions
    getCompleteClientDataApi,
    getSelectedClientDataApi,
    getCompleteProductDataApi,
    getSelectedProductDataApi

};

module.exports = dataFromDb;