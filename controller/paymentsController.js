exports.getPayments = (req,res)=>{
    res.render('payments/payments',
        {
            pageTitle:'Payments'
        
        }
    );
};

exports.makePayments = (req,res)=>{
    res.render('payments/makePayments',{
        pageTitle:'Make Payments'
    });
};