const mongo = require('mongoose')

var Schema = mongo.Schema;  

var StudentDashboardSchema = new Schema({
    UserEmail: {type: String},
    FirstName: {type: String},
    LastName: {type: String},      
    LoanStatus: { type: String },
    LoanIssued: {type: String},
    NextPayment: {type: String},
    AmountDue: {type: Number},
    isPaid: {type: Boolean},
    isLate: {type: Boolean}

},{ versionKey: false });  



var modelStudent = mongo.model('studentdashboard', StudentDashboardSchema, 'studentdashboard');  


module.exports = modelStudent