const mongo = require('mongoose')

var Schema = mongo.Schema;  


var LoanAppSchema = new Schema({      
    UserEmail: {type: String},
    FirstName: { type: String },
    LastName: { type: String },
    PhoneNumber: {type: Number},
    LoanAmount: { type: Number },
    Rate: { type: Number },
    PaymentMethod: { type: String },
    LoanHolder: { type: String },
    Issued: { type: String },
    LoanHolder: {type: String},
    LoanID: {type: Number},
    LoanName: {type: String}   
},{ versionKey: false });  



var model = mongo.model('openApps', LoanAppSchema, 'openApps');  


module.exports = model