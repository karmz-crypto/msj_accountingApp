const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
    _id : Schema.Types.ObjectId,
    date:{
        type: Date,
        require:true,
    },
    itemName :{
        type:String,
        require:true
    },
    itemPurity:{
        type:Number,
        default:0
    },
    purchasePurity:{
        type:Number
    },
    salePurity:{
        type:Number
    },
    purchaseLabour:{
        type:Number
    },
    saleLabourMax:{
        type:Number
    },
    saleLabourMin:{
        type:Number
    },

    itemRatePerPiece:{
        type:Number,
        default:0
    },
    inStock:{
        type:String
    },
    inStockStatus:{
        type:Boolean
    },
    inStockQuantity:{
        type:Number,
        default:0
    },
    itemWeight:{
        type:Number,
        default:0
    },
    itemQuantityWeight:{
        type:Number,
        default:0
    },
    itemQuantityNumber:{
        type:Number,
        default:0
    },
    productMetaData:{
        topPurchase:[{type:Number}],
        topSale:[{type:Number}],
        topPurchaseEntry:[{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}],
        topSaleEntry:[{ type:mongoose.Schema.Types.ObjectId,ref:'Sales' }]
    }

});

module.exports = mongoose.model('Product',productSchema);