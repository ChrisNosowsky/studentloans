const mongo = require('mongoose')

var Schema = mongo.Schema;  

var paymentLogSchema = new Schema({      
    DateConfirm: {type: String},
    SignedOffBy: {type: String},
    organization: {type: String},
    LoanID: {type: Number},
    LoanName:  {type: String},
    AmountStudentPaid: {type: Number},
    CumulativeAmountPaid: {type: Number},
    StudentFirstName: {type: String},
    StudentLastName: {type: String},
    AppID: {type: String}
},{ versionKey: false });  



var modelLog = mongo.model('paymentlog', paymentLogSchema, 'paymentlog');  


module.exports = modelLog