const express = require('express');
const signInController = require('../controller/signInController');
const indexController = require('../controller/indexController');
const clientsController = require('../controller/clientsController');
const purchaseController = require('../controller/purchaseController');
const salesController = require('../controller/salesController');
const paymentsController = require('../controller/paymentsController');
const productController = require('../controller/productController');
const api = express.Router();

//api.get('/',signInController.getSignInPage); //added 23/1/22

//index/home page 
api.get('/',indexController.getIndex);

// client get routes
api.get('/clients',clientsController.getClients);
api.get('/addClients',clientsController.addClients);
api.get('/:id/delete',clientsController.deleteClients);
api.get('/:id/updateClients',clientsController.updateClients);
api.get('/allClients',clientsController.allClients);
api.get('/allClients/:id',clientsController.allClients);
api.get('/:id/transactions',clientsController.clientsTransactions);

//sales get routes
api.get('/sales',salesController.getSales); //this routes opens sales home.
api.get('/addSalesPage',salesController.addSalesPage);

//purchase page routes
api.get('/addPurchase',purchaseController.getAddPurchase);
api.get('/purchase',purchaseController.getPurchase);

//product page get routes
api.get('/products',productController.getProductHomePage);
api.get('/addProduct',productController.addProductPage);

//pyments get routes
api.get('/payments',paymentsController.getPayments);

// post calls 
    // 0. signin post calls
api.post('/signIn',signInController.postSignInPage);
    // 1. client post calls
api.post('/addClients',clientsController.addClients2Db);
api.post('/:id/updateClients',clientsController.updateClient2Db);

    // 2. product post calls 
api.post('/:id/addProduct',productController.addProduct);

    //3. purchasse post calls 
api.post('/addPurchase',purchaseController.addPurchase);

module.exports = api;