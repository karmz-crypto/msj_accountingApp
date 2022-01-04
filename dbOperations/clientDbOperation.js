const clientsModel = require('../model/clientsModel');
const mongoose = require('mongoose');


function getClientHomePage(req,res){


    res.render('client/clients',
        {
            pageTitle:'Clients',
            searchClient:false
        }
    );
}

function getClientHomePageSearchResult(req,res){
    var name = req.query.nameOfClient.toLowerCase();
    clientsModel.find({nameOfClient:name},'nameOfClient')
        .then()
        .catch();
    res.render('client/clients',
        {
            pageTitle:'Clients',
            searchClient:true
        }
    );
}


function getClients(req,res){
    if(req.params.id){

        clientsModel.findById(req.params.id).exec()
        .then(e=>{ 
            res.render('client/clientPage',
            {
                pageTitle:'Client',
                webPageDataObject: e
            }
        );
        })
            .catch();


    }else{
        clientsModel.find().exec()
        .then(e=>{
            res.render('client/allClients',
            {
                pageTitle:'All Clients',
                webPageDataObject: e
            }
        );
        })
            .catch();
        
    }
   
}

function getClientToUpdate(req,res){
    var client = req.params.id;
    clientsModel.findById(client).exec()
        .then(e=>{
            res.render('client/updateClient',
            {
                pageTitle:'Update Client',
                clientData:e
            }
        );

        }).catch();
   
}

// function to add clients to a db .... 
function addClients(req,res){
    
    //console.log(req.body);
    checkDuplicateRecord(req,res);
    
    if(req.body.silverStatus==='advance'){
        var silverBalance = -parseFloat(req.body.silverBalance);
    }
        else{silverBalance = parseFloat(req.body.silverBalance);}
    if(req.body.cashBalance==='advance'){
        var cashBalance = -parseFloat(req.body.cashBalance);
    }
        else{var cashBalance = parseFloat(req.body.cashBalance);}

    const Clients = new clientsModel({
        _id : new mongoose.Types.ObjectId(),
        nameOfClient : req.body.nameOfClient,
        gstNum : req.body.gstNum,
        clientType:req.body.clientType,
        teleNum:req.body.teleNum,
        city:req.body.city,
        paymentStatusCash: cashBalance,
        paymentStatusSilver: silverBalance
    });
    
     Clients.save().then((data)=>{
       clientsModel.exists({_id:Clients._id}).then(e=>{
           if(e){addClientsResponseSuccess(res,data)}else{addClientsResponseFailure(res,false)}
       }).catch();
     }).catch();
}

function checkDuplicateRecord(req,res){
    clientsModel.exists({
        nameOfClient:req.body.nameOfClient,
        gstNum:req.body.gstNum,
        city:req.body.city,
        teleNum:req.body.teleNum
    }).then(e=>{
        if(e){addClientsResponseFailure(res,true)}else{return}
    }).catch();
}

function addClientsResponseSuccess(res,data){
    res.render('client/responsePage',{
        responseMsg:'Client Added Successfully',
        pageTitle:'Response Page',
        webPageResponseData:'clientAddSuccess',
        webData:data
    });
}

function addClientsResponseFailure(res,isExist){
    if(isExist){
        res.render('client/responsePage',{
            responseMsg:'Faild To Add The Client',
            pageTitle:'Response Page',
            webPageResponseData:'clientAddExist',
        });
    }
    else{
        res.render('client/responsePage',{
            responseMsg:'Faild To Add The Client',
            pageTitle:'Response Page',
            webPageResponseData:'clientAddFail'
        });
    }
    
}

function updateClient(req,res){
    console.log(req.body);
    clientsModel.findByIdAndUpdate(req.params.id,{
        nameOfClient:req.body.nameOfClient,
        gstNum:req.body.gstNum,
        clientType:req.body.clientType,
        teleNum:req.body.teleNum,
        city:req.body.city
    }).exec()
        .then(e=>{
            res.render('client/responsePage',{
                pageTitle: 'Response Page',
                webPageResponseData:'clientUpdateSuccess',
                responseMsg:'client Updated SuccessFully',
                webData:e
            });
        })
        .catch();
}

function deleteClientFromDb(req,res){
    clientsModel.deleteOne({_id:req.params.id}).exec()
    .then(()=>{
        res.render('client/responsePage',{
            pageTitle:'Response Page',
            webPageResponseData:'clientDeleteSuccess'
        });
    })
    .catch();
}




let clientsOperation = {
    addClients,
    getClients,
    getClientToUpdate,
    updateClient,
    deleteClientFromDb,
    getClientHomePage
};

module.exports = clientsOperation;