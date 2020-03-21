const mongo = require('mongoose')

var Schema = mongo.Schema;  

var LoanSchema = new Schema({      
    organization: {type: String},
    LoanAmount: {type: Number},
    LoanID: {type: Number},
    LoanInterest: {type: Number},
    RecurringPayments: {type: Number},
    LoanTerm: {type: String}

},{ versionKey: false });  



var modelLoans = mongo.model('loans', LoanSchema, 'loans');  


module.exports = modelLoans