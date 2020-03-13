const db = require("../models");
const loanApp = db.openApps;
const login = db.login;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.FirstName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const loanapps = new loanApp({
      Userid: req.body.Userid,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      LoanAmount: req.body.LoanAmount,
      Rate: req.body.Rate,

    });
  
    // Save Tutorial in the database
    loanapps
      .save(loanapps)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };


  exports.sendmail = (req, res) => {
    // Validate request
    if (!req.body.FirstName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const login = new login({
      FirstName: req.body.FirstName,
      MiddleName: req.body.MiddleName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      isConfirmed: req.body.isConfirmed

    });
  
    // Save Tutorial in the database
    login
      .save(login)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };









// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const LastName = req.query.LastName;
    var condition = LastName ? { LastName: { $regex: new RegExp(LastName), $options: "i" } } : {};
    
    loanApp.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
        });
    };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};