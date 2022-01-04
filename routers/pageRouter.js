const express = require('express');
const indexController = require('../controller/indexController');
const clientsController = require('../controller/clientsController');
const purchaseController = require('../controller/purchaseController');
const salesController = require('../controller/salesController');
const paymentsController = require('../controller/paymentsController');
const productController = require('../controller/productController');
const api = express.Router();

api.get('/',indexController.getIndex);
api.get('/clients',clientsController.getClients);
api.get('/purchase',purchaseController.getPurchase);
api.get('/sales',salesController.getSales);
api.get('/payments',paymentsController.getPayments);
api.get('/addClients',clientsController.addClients);
api.get('/:id/delete',clientsController.deleteClients);
api.get('/:id/updateClients',clientsController.updateClients);
api.get('/:id/transactions',clientsController.clientsTransactions);
api.get('/allClients',clientsController.allClients);
api.get('/allClients/:id',clientsController.allClients);
//purchase page routes
api.get('/addPurchase',purchaseController.getAddPurchase);

//product page routes
api.get('/products',productController.getProductHomePage);
api.get('/addProduct',productController.addProduct);

// post calls 

api.post('/addClients',clientsController.addClients2Db);
api.post('/:id/updateClients',clientsController.updateClient2Db);
module.exports = api;