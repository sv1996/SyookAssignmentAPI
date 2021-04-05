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
const cutomerSchema = {
  name: String,
  city: String
}


const deliveryVehicleSchema = {
registrationNumber: Number,
vehicleType: Array,
city: String,
activeOrdersCount : { type: Number, min: 0, max: 2 }


}

const orderSchema = {
orderNumber: String,
itemId: String,
price: String,
cutomerId : String,
deliveryVehicleId : String,
isDelivered:{type:Boolean}
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


app.delete("/items" , function (req , res){
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
//request for a specific Vehicles
/// localhost:3000/items/alto

app.route("/items/:vehicleTitle")

.get(function(req ,res){
  Item.findOne({name: req.params.vehicleTitle} , function (err , foundVehicle){
    if(foundVehicle){
      res.send(foundVehicle)
    } else {
      res.send("No Vehicle Maching that Name was found.");
    }
  });
})

.put(function (req , res ){
Item.update(
  // search for new Vehicle Name
  {name: req.params.vehicleTitle},
  {name : req.body.name, price: req.body.price},
{overwrite: true},
function (err){
  if(!err){
    res.send("Successfully updated Vehicle.");
  }
}
);
})
// update a particular vehicle only provided data

.patch(function (req , res){
Item.update(
{name: req.params.vehilceTitle},
{$set: req.body},
function (err){
if(!err)
{
  res.send("Successfully updated article.")

} else
{
  res.send(err);
}

}
);

});











app.listen(3000, function () {
  console.log("Server started on port 3000");
});
