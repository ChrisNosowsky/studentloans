const mongo = require('mongoose')

var Schema = mongo.Schema;  


var LoanAppSchema = new Schema({      
    UserEmail: {type: String},
    FirstName: { type: String },
    LastName: { type: String },
    PhoneNumber: {type: Number},
    LoanAmount: { type: Number },
    RemainingBalance: {type: Number},
    Rate: { type: Number },
    PaymentMethod: { type: String },
    LoanHolder: { type: String },
    Issued: { type: String },
    AppReviewDate: {type: String},
    LoanHolder: {type: String},
    LoanID: {type: Number},
    LoanName: {type: String},
    APID: {type: String},
    DriversLicense: {type: String},
    LenderPaid: {type: Boolean},
    AdditonalNotes: {type: String},
    markedPaidBy: {type: String},
    AppCreateDate: {type: String},
    BankAccount: {type: Number},
    RoutingNumber: {type: Number}
},{ versionKey: false });  



var model = mongo.model('openApps', LoanAppSchema, 'openApps');  


module.exports = model