const express = require('express');
const app = express();
const port = 5000;
var parser = require('body-parser');
app.use(parser.urlencoded({extended: true}));
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/fruitsdb";
var str = [];
var tsr = "";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');



app.get('/', function(req, res){
  const fruitSchema = new mongoose.Schema({
    name : String,
    rating: Number,
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema );

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else{

    fruits.forEach(function(fruit){
      console.log(fruit.name);
      tsr = tsr +  fruit.name;

    })

  }
  str.push(tsr);

})
console.log(str);
res.render('index', {items : str});

});


app.post('/', function(req, res){

  var n = req.body.item;
  var ra = req.body.rating;
  var re = req.body.reviews;

  const fruitSchema = new mongoose.Schema({
    name : String,
    rating: Number,
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema );
  const fruit = new Fruit({
    name: n,
    rating: ra,
    review: re
  });
  fruit.save();


Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else{
    fruits.forEach(function(fruit){
      console.log(fruit.name);

    })
  }
})

Fruit.bulkWrite([
  {
    insertOne: {
      fruits: {
        name: 'Eddard Stark',
        title: 'Warden of the North'
      }
    }
  },
  {
    updateOne: {
      filter: { name: 'Apple' },
      // If you were using the MongoDB driver directly, you'd need to do
      // `update: { $set: { title: ... } }` but mongoose adds $set for
      // you.
      update: { review: 'Hand of the King' }
    }
  }
]).then(res => {
 // Prints "1 1 1"
 console.log(res.insertedCount, res.modifiedCount, res.deletedCount);
});

  res.send("Server is runing fine");
})





app.listen(port, function(req, res){
  console.log("Server is up and running");
})
