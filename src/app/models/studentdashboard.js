const mongo = require('mongoose')

var Schema = mongo.Schema;  

var StudentDashboardSchema = new Schema({
    UserEmail: {type: String},
    FirstName: {type: String},
    LastName: {type: String},      
    LoanStatus: { type: String },
    LoanIssued: {type: String},
    LoanAmount: {type: Number},
    PayoffDate: {type: String},
    RemainingBalance: {type: Number},
    LenderPaid: {type: Boolean},
    isPaid: {type: Boolean},
    isLate: {type: Boolean},
    APID: {type: String},
    DriversLicense: {type: String}

},{ versionKey: false });  



var modelStudent = mongo.model('studentdashboard', StudentDashboardSchema, 'studentdashboard');  


module.exports = modelStudent