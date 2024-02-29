const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        requried: true
    },
    password: {
        type: String,
        required: true
    },
    cart : {
        items : [{productId:{ type: Schema.Types.ObjectId, ref:'Product', requried:true}, qty: {type: Number, required:true } }]
    }
});

module.exports = mongoose.model('User', userSchema);

