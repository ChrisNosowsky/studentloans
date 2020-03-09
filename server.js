const express = require("express"); // Web framework
const bodyParser = require("body-parser"); // Parser for reading requests
const cors = require("cors"); // Allow cross-origin resource sharing
var mongo = require("mongoose"); // MongoDB modelling tool

var db = mongo.connect("mongodb://localhost:27017/studentloanstest", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  

const app = express();
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
// Where content is served
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
// Call Schema type and create our application schema

var Schema = mongo.Schema;  
  
var LoanAppSchema = new Schema({      
    Userid: {type: Number},
    FirstName: { type: String },
    LastName: { type: String },
    LoanAmount: { type: Number },
    Rate: { type: String },
    LoanHolder: { type: String },
    DateIssued: { type: String },
    Issued: { type: String },   
},{ versionKey: false });  
   
// Model  
var model = mongo.model('openApps', LoanAppSchema, 'openApps');  

// Create a new user  
app.post("/api/SaveUser",function(req,res){   
    var mod = new model(req.body); 
    console.log(req.body);
    if(req.body.mode =="true")  
    {  
       mod.save(function(err,data){  
         if(err){  
            res.send(err);                
         }  
         else{        
             res.send({data:"Record has been Inserted!!"});  
         }  
    });  
   }  
   else   
   {  
    model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
      function(err,data) {  
      if (err) {  
      res.send(err);         
      }  
      else{        
             res.send({data:"Record has been Updated..!!"});  
        }  
    });  
     
     
   }  
    })  
     
    app.post("/api/deleteUser",function(req,res){     
       model.remove({ _id: req.body.id }, function(err) {    
        if(err){    
            res.send(err);    
        }    
        else{      
               res.send({data:"Record has been Deleted..!!"});               
           }    
    });    
      })  
     
    app.get("/api/getUser",function(req,res){  
       model.find({},function(err,data){  
                 if(err){  
                     res.send(err);  
                 }  
                 else{                
                     res.send(data);  
                     }  
             });  
     })  
    
     app.get("/api/getUserIssued",function(req,res){  
        model.find({Issued: "true"},function(err,data2){  
                  if(err){  
                      res.send(err);  
                  }  
                  else{                
                      res.send(data2);  
                      }  
              });  
      })  

     
   app.listen(8080, function () {  
       
    console.log('Example app listening on port 8080!')  
   }) 