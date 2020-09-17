const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/InternsDB";

mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("Connected to MongoDB");}
    else{
        console.log("Error connecting to MongoDB");
    }
})

// include the employee model

require('./interns.model');