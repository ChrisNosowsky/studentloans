const mongo = require('mongoose')

var Schema = mongo.Schema;  

var StudentDashboardSchema = new Schema({      
    LoanStatus: { type: String }
},{ versionKey: false });  



var modelLogin = mongo.model('studentdashboard', StudentDashboardSchema, 'studentdashboard');  


module.exports = modelStudentDashboard