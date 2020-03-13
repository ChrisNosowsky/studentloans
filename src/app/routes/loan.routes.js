module.exports = app => {
    const loan = require("../controllers/loan.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", loan.create);
    router.post("/:id", loan.sendmail);
    // Retrieve all Tutorials
    router.get("/", loan.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", loan.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", loan.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", loan.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", loan.delete);
  
    // Create a new Tutorial
    router.delete("/", loan.deleteAll);
  
    app.use('/api/', router);
  };