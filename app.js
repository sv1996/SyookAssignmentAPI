const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true,}));
app.use(express.static("public"));
 mongoose.connect('mongodb://localhost:27017/orderDB',  {useNewUrlParser: true, useUnifiedTopology: true});


const itemSchema = {
  name: String,
  price: Number
}

const Item = mongoose.model("Item" ,  itemSchema);
//const car = new Item;
//car.name = 'Maruti';
//m.price= 400000;
//m.save();

app.get("/items" ,  function(req ,res){
  Item.find(function(err,  foundItems){
    if(!err)
    {
      res.send( foundItems);
    } else {
      res.send(err);
    }

  });
});
app.post("/items"  , function(req ,res){

  const newItem = new Item({
    name: req.body.name,
    price: req.body.price
  });

   newItem.save(function(err){
    if(!err){

      res.send("Successfully Added a new vahicle");
    } else {
      res.send(err);
    }
  });
});


app.detele("/items" , function (req , res){
Item.deleteMany(function (err){
if(!err)
{
  res.send("uccessfully deleted ALL Vehicles from DB");
}
 else
 {
   res.send(err);
 }

});


});











app.listen(3000, function () {
  console.log("Server started on port 3000");
});
