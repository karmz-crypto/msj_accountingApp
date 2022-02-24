const express = require('express');
//const data = require('../dbOperations/getDataFromDb');
const apiProductController = require('../apiController/productController');
const apiClientController = require('../apiController/clientsController');
const api = require('./pageRouter');
const apiPageRouter = express.Router();

//get data router
        //product api router
apiPageRouter.get('/getSelectedProduct/:id',apiProductController.selectedProductData);
apiPageRouter.get('/getCompleteProduct',apiProductController.completeProductData);

        //client api router
apiPageRouter.get('/getSelectedClient/:id',apiClientController.selectedClientData);

//post data router
module.exports = apiPageRouter;
