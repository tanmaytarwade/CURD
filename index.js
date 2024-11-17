const express = require("express");
const mongoose = require("mongoose");
const db = require("./database/db.js");
db();

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    pname: String, // Ensure this matches your MongoDB document fields
    price: Number,
    discount: Number,
  });

  var userModel = mongoose.model("product", userSchema, "product");

const app = express();
app.use(express.json());

// Default route for "/"
/*app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});*/

app.get("/product", async (req, res) => {
    try {
      var ansFromDb = await userModel.find(); // Use Mongoose model
      console.log("Data from userModel:", ansFromDb); // Debugging
      res.send(ansFromDb);
    } catch (err) {
      console.log("Error:", err.message); // Debugging
      res.send(err.message);
    }
  });


  app.post("/product", async (req, res) => {
    //   console.log(req.body);
      try {
        var record = new userModel(req.body)
      await record.save();
      res.send("product Added");
    } catch (err) {
      res.send(err.message);
    }
  });
  
  
  
  

app.listen(9000);
