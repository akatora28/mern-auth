const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VerificationTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    verificationCode: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('VerificationToken', VerificationTokenSchema);