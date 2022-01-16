const express = require('express');
const data = require('../dbOperations/getDataFromDb');
const apiProductController = require('../apiController/productController');
const apiPageRouter = express.Router();

//get data router
        //product api router
apiPageRouter.get('/getSelectedProduct/:id',apiProductController.selectedProductData);

//post data router
module.exports = apiPageRouter;
