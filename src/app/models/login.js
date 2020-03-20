const mongo = require('mongoose')

var Schema = mongo.Schema;  

var LoginSchema = new Schema({      
    FirstName: { type: String },
    MiddleName: { type: String },
    LastName: { type: String },
    UserEmail: { type: String },
    password: {type: String},
    isConfirmed: { type: Boolean },
    status: {type: Boolean},
    role: {type: String},
    hash: {type: String}   
},{ versionKey: false });  



var modelLogin = mongo.model('login', LoginSchema, 'login');  


module.exports = modelLogin