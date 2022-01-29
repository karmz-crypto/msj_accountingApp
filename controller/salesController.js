const data = require('../dbOperations/getDataFromDb');

exports.getSales = (req,res)=>{
    res.render('sales/salesHome',
        {
            pageTitle:'Sales'
        }
    );
};

exports.addSalesPage = (req,res)=>{
    let clientData = data.getCompleteClientData();
    let productData = data.getCompleteProductData();
    Promise.all([clientData,productData]).then(
        e=>{
            res.render('sales/addSalesPage',
        {
            pageTitle:'Add Sales Page',
            clientData:e[0],
            productData:e[1]
        }
    );
        }
    ).catch();
    
};

exports.addSales = (req,res)=>{
    console.log(req.body);
};