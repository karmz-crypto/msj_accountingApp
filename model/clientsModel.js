const mongoose = require('mongoose');
//const { object } = require('webidl-conversions');

const Schema = mongoose.Schema;

const clientSchema = Schema({
    _id : Schema.Types.ObjectId,
    nameOfClient :{
        type:String,
        required : true,
        lowercase:true
    },
    teleNum :{
        type:Number,
        required:true,
        lowercase:true,
        unique : true
    },
    gstNum:{
        type:String,
        lowercase:true
    },
    clientType:{
        type:String,
        required:true,
        lowercase:true
    },
    city:{
        
            type:String,
            required:true,
            lowercase:true
        
    },
    purchaseProduct:[{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}],
    salesProduct:[{type:mongoose.Schema.Types.ObjectId,ref:'Sales'}],
    payments : [{type:mongoose.Schema.Types.ObjectId,ref:'Payments'}],
    silverRateTransaction :[{
        date:{
            type:Date,

        },
        paymentStatusCash:{
            type: Number
        },
        paymentStatusSilver:{
            type:Number
        },
        silverRate:{
            type:Number
        }
    }],
            purchaseCount:{
                type:Number,
                default:0
            },
            saleCount:{
                type:Number,
                default:0
            },
            totalPurchaseSilver:{
                type:Number,
                default:0
            },
            totalPurchaseCash:{
                type:Number,
                default:0
            },
            totalSaleCash:{
                type:Number,
                default:0
            },
            totalSaleSilver:{
                type:Number,
                default:0
            },
            totalPaymentSilver:{
                type:Number,
                default:0
            },
           
            totalPaymentCash:{
                type:Number,
                default:0
            },
            paymentStatusCash:{ //=totalsalecash-totalpurchasecash 
                type:Number,
                default:0
            },
            paymentStatusSilver:{type:Number,default:0},
            //silverRateEntry:[{ type:Number, default:0}],
            //silverRateEntryDate:[{ type:Date }]
    
        
        

    specialAttribute:{
        type:Object
    }

    
});

module.exports = mongoose.model('Client',clientSchema);

