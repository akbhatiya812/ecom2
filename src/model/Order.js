const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    products : [{
        productId : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        qty : { type: Number, required:true}
    }],
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        requried: true
    },
    address: String,
    phone : String
},{timestamps:true});


module.exports = mongoose.model('Order', orderSchema);