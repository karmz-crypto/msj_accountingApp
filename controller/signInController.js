require('dotenv').config();  //changed 23/1/22
var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

exports.getSignInPage = (req,res)=>{ //get signin page 
    res.render('signIn/signIn',{
        pageTitle:'SignIn',
        error:""
    });
};

exports.postSignInPage = (req,res)=>{
    const number = req.body.number;
    messagebird.verify.create(number,{
        //originator : 'Code',
        template: 'Your verification code is %token.'
    },
    (err,response)=>{
        if(err){
            console.log(err);
           res.render('signIn/signIn', {
               pageTitle:'SignIn',
               error : err.errors[0].description
           });

        }else{
            console.log(response);
            res.render('signIn/signInVerification',{
                pageTitle:'SignIn Verification',
                id:response.id
            });
        }
    });
};
