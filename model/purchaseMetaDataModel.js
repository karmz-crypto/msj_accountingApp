const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseMetaDataSchema = new Schema({
    lastPurchaseDate:{type:Date,default:Date.now()},
    purchaseList:[{purchaseEntry:{type:mongoose.Schema.Types.ObjectId,ref:'Purchase'}}],
    topPurchaseWeight:[{type:Number}]

});

module.exports = mongoose.model('PurchaseMetaData',purchaseMetaDataSchema);