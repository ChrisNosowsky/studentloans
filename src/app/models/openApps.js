const mongo = require('mongoose')

var Schema = mongo.Schema;  


var LoanAppSchema = new Schema({      
    Userid: {type: Number},
    FirstName: { type: String },
    LastName: { type: String },
    PhoneNumber: {type: Number},
    LoanAmount: { type: Number },
    Rate: { type: String },
    LoanHolder: { type: String },
    Issued: { type: String },   
},{ versionKey: false });  



var model = mongo.model('openApps', LoanAppSchema, 'openApps');  


module.exports = model