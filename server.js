const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
var mongo = require("mongoose"); 
const {MongoClient} = require('mongoose')
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-handlebars');
var crypto = require('crypto');
var details = require('../confidential/details');
mongo.set('useFindAndModify', false);
mongo.Promise = Promise
var db = mongo.connect("mongodb+srv://admin:admin@testcluster-lw1di.mongodb.net/test?authSource=admin&replicaSet=TestCluster-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  

//need SendGrid or MailGun for a Production Application for sending confirmation email

const app = express();

app.use(session({
    secret: 'sadhk21h3hdkjh913ldkjsal',
    saveUninitialized: true,
    resave: true

}))
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
//app.use(cors({ credentials: true, origin: "*" }));  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  


const model = require('./src/app/models/openApps')
const modelLogin = require('./src/app/models/login')
const modelStudent = require('./src/app/models/studentdashboard')
const modelLender = require('./src/app/models/lenderdashboard')
const modelLoans = require('./src/app/models/loans.js')
const modelLog = require('./src/app/models/paymentLog');
var host;
app.post("/api/SaveUser",function(req,res){   
    var mod = new model(req.body); 
    if(req.body.mode =="Save")  
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
     
     

app.post("/api/SaveApp", function(req,res) {
    var mod = new model(req.body)
    console.log(req.body)
    mod.save(function(err,data){
        if(err) {
            res.send(err);
        } else {
            console.log("Saved!")
            res.send(data);
        }
    });
})

app.post("/api/CreateStudentDash", function(req,res) {
    var mod = new modelStudent(req.body)
    mod.save(function(err,data){
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

app.post("/api/CreatePaymentLog", function(req,res) {
    var mod = new modelLog(req.body)
    mod.save(function(err,data){
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

app.post("/api/getUser",function(req,res){  
    model.find({LoanHolder: req.body.LoanHolder},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            });  
    })  


app.get("/api/getLoans",function(req,res){  
    modelLoans.find({},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            });  
    }) 

app.post("/api/findLoan",function(req,res){  
    modelLoans.findOne({LoanName: req.body.LoanName},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{            
                    res.send(data);  
                    }  
            });  
    }) 
    
app.post("/api/getUserIssued",function(req,res){  
    model.find({LoanHolder: req.body.LoanHolder, Issued: "true"},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            });  
})  


app.post("/api/getStudentDashboard",function(req,res){  
    modelStudent.findOne({UserEmail: req.body.UserEmail},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            });  
})  

app.post("/api/UpdateOpenAppToIssued",function(req,res){  
    if(req.body.LenderPaid) {
        model.findOneAndUpdate({UserEmail: req.body.UserEmail}, {LenderPaid: req.body.LenderPaid, RemainingBalance: req.body.RemainingBalance, markedPaidBy: req.body.markedPaidBy},function(err,data){  
                    if(err){  
                        res.send(err);  
                    }  
                    else{                
                        res.send(data);  
                        }  
                });
        }      
        else {
            model.findOneAndUpdate({UserEmail: req.body.UserEmail}, {Issued: req.body.Issued, AdditonalNotes: req.body.AdditonalNotes, AppReviewDate: req.body.AppReviewDate},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            });
        }
})  

app.post("/api/UpdateStudentDashboard",function(req,res){  
    if(req.body.LenderPaid) {
    modelStudent.findOneAndUpdate({UserEmail: req.body.UserEmail}, {LenderPaid: req.body.LenderPaid, RemainingBalance: req.body.RemainingBalance},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            }); 
        } 
        else {
            modelStudent.findOneAndUpdate({UserEmail: req.body.UserEmail}, 
                {LoanStatus: req.body.LoanStatus, LoanIssued: req.body.LoanIssued, PayoffDate: req.body.PayoffDate, 
                    APID: req.body.APID, DriversLicense: req.body.DriversLicense, 
                    RemainingBalance: req.body.RemainingBalance},function(err,data){  
                if(err){  
                    res.send(err);  
                }  
                else{                
                    res.send(data);  
                    }  
            }); 
        } 
})  

app.post("/api/sendmail", (req, res) => {
    var mod = new modelLogin(req.body);
    console.log("request came");
    let user = req.body;
    let rand=Math.floor((Math.random() * 100) + 54);
    let hash = crypto.createHash('md5').update(rand.toString()).digest('hex');
    host=req.get('host');
    modelLogin.findOne({UserEmail: user.UserEmail}, function(err,data) {
        if(err) {
            console.log("Fatal Error in finding our Email");
        }
        else {
            if (data == null) {
                sendMail(user, hash, info => {
                    console.log(`Mail sent. id is ${info.messageId}`);
                });
                mod.save(function(err,data){  
                    if(err){  
                    res.send(err);         

                    }  
                    else{        
                        res.send({data:"Record has been Inserted!!"}); 
                        setHash(data, hash);  
                    }  
                });
            }
            else {
                console.log("Email already registered!");
                res.send(err);
            }
        }
    })
})

    async function sendMail(user, hash, callback) {
        let link="http://"+host+"/verify?id="+hash; // let means one time click and done.
    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: details.email,
            pass: details.password
            }
        })
        transporter.use('compile', hbs({
            viewEngine: {
                partialsDir:'./src/views/',
                defaultLayout:""
            },
            viewPath: './src/views/',
            extName:'.hbs'
        }));
        let mailOptions = {
            from: '<chrisnosowsky@gmail.com>', // sender address
            to: user.UserEmail, // list of receivers
            subject: "Thank you for Registering with SmartiFi", // Subject line
            template: 'index',
            context: {
                FirstName: user.FirstName,
                LastName: user.LastName,
                linkSend: link
            }
        }
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        callback(info);  
    } 

    app.post("/api/sendAppMail", (req, res) => {
        sendAppMail(req.body)
    })

    async function sendAppMail(user) {
        var template = ""
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: details.email,
            pass: details.password
            }
        })
        transporter.use('compile', hbs({
            viewEngine: {
                partialsDir:'./src/views/',
                defaultLayout:""
            },
            viewPath: './src/views/',
            extName:'.hbs'
        }));
        if(user.Issued === "true") {
            template = 'approve'
        } else {template = 'reject'}
        let mailOptions = {
            from: '<chrisnosowsky@gmail.com>', // sender address
            to: user.UserEmail, // list of receivers
            subject: "SmartiFi - Application Update!", // Subject line
            template: template,
            context: {
                FirstName: user.FirstName,
                LastName: user.LastName,
                LoanName: user.LoanName,
                LoanAmount: user.LoanAmount
            }
        }
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions); 
    }


    app.get('/verify',function(req,res){
        var hashed = req.query.id;
        modelLogin.findOne({hash: hashed}, function(err,data) {
            if(err) {
                console.log("Error finding hash");
            } else {
                console.log(data);
                console.log("Success finding hash.");

                console.log(data.hash);
                if((req.protocol+"://"+req.get('host'))==("http://"+host))
                {
                    console.log("Domain matched. Authentic email.");
                    if(req.query.id==data.hash)
                    {
                        console.log("Email verified.");
                        res.end("<h1>Email "+data.UserEmail+" has been verified. Enjoy SmartiFi!</h1><p>You may now close this tab and return to login.</p>");
                        updateConfirm(data);
                    }
                    else
                    {
                        console.log("email is not verified");
                        res.end("<h1>Bad Request</h1>");
                    }
                }
                else
                {
                    res.end("<h1>Request is from unknown source");
                }
            }
        })
        });


    app.post("/api/getOrgOpenApps", async (req, res) => {
        console.log(req.body.LoanHolder)
        model.find({LoanHolder: req.body.LoanHolder}, function(err,data) {
            if(err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    })

    app.post("/api/getEmail", async (req,res) => {  
        modelLogin.findOne({UserEmail: req.body.UserEmail, password: req.body.password, isConfirmed: true, role: req.body.role},function(err,data){
                    console.log(data)
                    if(err || data === null){ 
                        res.send(err);  
                    }  
                    else{
                        console.log(data);
                        req.session.user =  req.body.UserEmail
                        req.session.FirstName = data.FirstName
                        req.session.LastName = data.LastName
                        req.session.role = req.body.role
                        req.session.isConfirmed = true
                        req.session.organization = data.organization
                        req.session.save(() => {
                            console.log(req.session);
                            res.send(req.session);
                            
                        });
                        
                        }  
                });  
        })
    
    async function setHash(user, hash) {
        modelLogin.findOne({UserEmail: user.UserEmail}, function(err,data) {
            data.hash = hash;
            data.save(function (err) {
                if(err) {
                    console.log("Error saving hash");
                } else {
                    console.log("Success saving hash.");
                }
            })
        })
    }


    async function updateConfirm(result) {
        modelLogin.findOne({UserEmail: result.UserEmail}, function(err,data) {
            data.isConfirmed = true;
            data.save(function (err) {
                if(err) {
                    console.log("Error updating confirm");
                } else {
                    console.log("Success updating confirm");
                }
            })
        })
    }


    app.get('/api/isloggedin', (req, res) => {
       res.json({
           status: !!req.session.user
       }) 
    })

   app.get('/api/data', async (req, res) => {

        const user = await modelLogin.findOne({UserEmail: req.session.user}) 
        if(!user) {
            res.json({
                status: false,
                message: 'User not logged in or does not exist'
            })
            return
        } 
        res.json({
            status: true,
            email: req.session.user,
            FirstName: req.session.FirstName,
            LastName: req.session.LastName,
            role: req.session.role,
            isConfirmed: req.session.email,
            organization: req.session.organization
        })
   }) 

   app.get('/api/logout', (req, res) => {
       req.session.user = undefined
       req.session.FirstName = undefined
       req.session.LastName = undefined
       req.session.role = undefined
       req.session.isConfirmed = undefined
       req.session.organization = undefined
       req.session.save(() => {
        console.log("Logging out goodbye!");
        console.log(req.session);
        res.send(req.session);
        });

   })
























   app.listen(8080, function () {  
       
    console.log('Example app listening on port 8080!')  
   })