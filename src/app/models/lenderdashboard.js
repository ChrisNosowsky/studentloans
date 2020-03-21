const mongo = require('mongoose')

var Schema = mongo.Schema;  

var LenderDashboardSchema = new Schema({      
    LoansIssued: {type: Number},
    LoansInReview: {type: Number},
    LoanTotalOutstanding: {type: Number},
    LoanAmountInReview: {type: Number}
},{ versionKey: false });  



var modelLender = mongo.model('dashboard', LenderDashboardSchema, 'dashboard');  


module.exports = modelLender