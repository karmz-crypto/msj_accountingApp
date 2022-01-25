exports.getSales = (req,res)=>{
    res.render('sales/salesHome',
        {
            pageTitle:'Sales'
        }
    );
};

exports.addSalesPage = (req,res)=>{
    res.render('sales/addSalesPage',
        {
            pageTitle:'Add Sales Page'
        }
    );
};