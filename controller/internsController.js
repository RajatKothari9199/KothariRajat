const express = require('express');

const mongoose = require('mongoose');

const Interns = mongoose.model('Interns');

const router = express.Router();

router.get("/",(req,res) => {
    res.render("interns/addOrEdit",{
       viewTitle:'Insert Intern' 
    })
})

router.post("/",(req,res) => {
if(req.body._id == "")
    {
    insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
})

function insertRecord(req,res)
{
    var interns = new Interns();

    interns.fullName = req.body.fullName;

    interns.email = req.body.email;

    interns.mobile = req.body.mobile;

    interns.city = req.body.city;

    interns.save((err,doc) => {
        if(!err){
            res.redirect('interns/list');
        }
        else{
			  if(err.name == "ValidationError"){
              handleValidationError(err,req.body);
              res.render("employee/addOrEdit",{
                  viewTitle:"Insert Interns",
                  employee:req.body
				})
			}
			console.log("Error occured during record insertion" + err);

		}
})}

function updateRecord(req,res)
{
    Interns.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc) => {
        if(!err){
            res.redirect('interns/list');
        }
        else{
            if(err.name == "ValidationError")
            {
                handleValidationError(err,req.body);
                res.render("interns/addOrEdit",{
                    viewTitle:'Update Interns',
                    employee:req.body
                });
            }
            else{
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

// create a route for displaying all the users

router.get('/list',(req,res) => {
    Interns.find((err,docs) => {
        if(!err){
            res.render("interns/list",{
                list:docs
            })
        }
    })
})

router.get('/:id',(req,res) => {
    Employee.findById(req.params.id,(err,doc) => {
        if(!err){
            res.render("interns/addOrEdit",{
                viewTitle: "Update Interns",
                employee: doc
            })
        }
    })
})

router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){
            res.redirect('/interns/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
        case 'fullName':
              body['fullNameError'] = err.errors[field].message;
              break;
        
        case 'email':
              body['emailError'] = err.errors[field].message;
              break;

        default:
           break;
        }
    }
}

module.exports = router;