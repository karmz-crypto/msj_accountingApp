/* this page should render data to view frm backend ...controller page must link both to backend and frontend
res.render is the link of controller to frontend.
for backend it can include a file which is connected to backend 

eg: const connect2ClientDbOperation = require('utility/clientDbOperation');
clientDbOperation this file will only connect with clients controller and determine the types of Db operation is req
for eg: searching a client / updation a client / mining of client data for investments like purchase & sale
*****************
clientDbOperation(type of operation, dataNotRequired{type:array}) FUNC 
*/

const clientDbOperation = require('../dbOperations/clientDbOperation');


exports.getClients = (req,res)=>{
    clientDbOperation.getClientHomePage(req,res);
    
};

exports.addClients = (req,res)=>{
    res.render('client/addClients',
        {
            pageTitle:'Add Clients'
        }
    );
};

exports.addClients2Db = (req,res)=>{
    //console.log(req.body);
    //console.log(typeof(parseFloat(req.body.bullionBalance)));
    clientDbOperation.addClients(req,res);
};

exports.deleteClients = (req,res)=>{

   clientDbOperation.deleteClientFromDb(req,res);
};

exports.updateClients = (req,res)=>{ // this func gets you the data frm the db of the client to be updated 
    clientDbOperation.getClientToUpdate(req,res);
   
};

exports.updateClient2Db =(req,res)=>{ // this function actually updates the data in db of the client 
    clientDbOperation.updateClient(req,res);
};


exports.clientsTransactions = (req,res)=>{
    /* transaction of 3 types : 1. notManufacturer 2. manufacturer 3. pending, therefore responseObject will 
    carry data as per the type of the transaction.
    notManufacturerTransactions()
    manufacturerTransactions()
    pendingTransactions()
     */
    var responseType = req.params.id;
    //console.log(responseType);
    var responseObject = {}; // data type : object.
    //console.log(typeof(responseObject));
    res.render('clientsTransactions',
        {
            pageTitle:'Clients Transactions',
            webPageDataObject: responseObject
        }
    );
};  

exports.allClients = (req,res)=>{

    //var id = req.params.id
    clientDbOperation.getClients(req,res);
   
};

exports.clientPage = (req,res)=>{
    const clientId = req.params.id;
    var responseObject = 'findClientFromDb(clientId)'; // the func must retun an object
    res.render('clientPage',{
        pageTitle:'Cient Page',
        webPageDataObject:responseObject
    });

};