const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = Schema({
    _id : Schema.Types.ObjectId,
    date:{
        type:Date,
        default:Date.now(),
        required:true
    },
    client :{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    purchaseByWeight:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        weight:{type:Number,default:0},
        purchaseWastage:{type:Number,default:0},
        purchaseLabour:{type:Number,default:0},
        fineWight:{type:Number,default:0},
        labourCost:{type:Number,default:0},
        ratePerPiece:{type:Number,default:0},
        numberofItem:{type:Number,default:0}
    }],
    purchaseByPiece:[{

        product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
        ratePerPiece:{type:Number,default:0},
        numberofItem:{type:Number,default:0}

    }],
    purchaseByWeightMetaData:{
        totalPurchaseWeight:{
            type:Number,
            default:0
        },
        totalPurchaseCash:{type:Number,default:0},
    },
    purchaseByPieceMetaData:{
        totalPurchaseCash:{type:Number,default:0},
        totalNumberOfItems:{
            type:Number,
            default:0
        }
    }
    


}); 

module.exports = mongoose.model('Purchase',PurchaseSchema);

