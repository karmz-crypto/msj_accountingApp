const productDbOperation = require('../dbOperations/productDbOperation');

exports.getProductHomePage = (req,res)=>{
    productDbOperation.getProductHomePage(req,res);
};

exports.addProductPage = (req,res)=>{
    productDbOperation.addProductPage(req,res);
};

exports.addProduct = (req,res)=>{
    var response = productDbOperation.productExist(req);
    response.then(e=>{ console.log(e);
        if(e){
            res.render('product/responsePage',{
                pageTitle:'Response Page',
                responseMsg:'productExist'
            });
        }else{
             productDbOperation.addProduct(req,res); }
        
      
    }).catch();
      
};