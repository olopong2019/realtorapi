const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
var db = require('./db/mongoose');
var Ahente = require('./models/ahente');
var app = express();

const PORT = 3004;

// var janice = new Ahente({
//     name: "janice",
//     mobileNo: "09260370114",
//     address: "VSM6",
//     email: "janheza@gmail.com"

// });

app.use(bodyParser.json());

app.post('/ahente/create',(req,res)=>{
    var agents = new Ahente(req.body);
    agents.GenerateJWTToken((result)=>{
        if(result.status == 'Success'){
            res.json(result);
        }else{
            res.status(400).send(result.ErrorDetails);
        }
    })
    // bcrypt.hash(req.body.password,10,(err,hashed_pw)=>{
    // agents.password = hashed_pw;
    //     agents.save()
    //     .then(result => {
    //         console.log(result);
    //         res.json({status: 'Success',
    //         token: jwt.sign({id:agents.id,name: agents.name,mobileNo: agents.mobileNo,address: agents.address,
    //                             email:agents.email,password: agents.password,joinDate:agents.joinDate,SeminarDate:agents.SeminarDate,idExpiryDate:agents.idExpiryDate},'key123456')
    //     });
    //     })
    //     .catch(err => {
    //         console.log('Nag-error tabis sa pagsave', err);
    //         res.status(400).send(err);
    //     });
    // })

})

app.get('/ahente',(req,res)=>{
    Ahente.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return Ahente.find({});
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));    
});

app.get('/ahente/:id',(req,res)=>{
    Ahente.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return Ahente.findOne({"id":req.params.id});
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
})

app.patch('/ahente/:id',(req,res)=>{
    Ahente.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return Ahente.findOneAndUpdate({"id":req.params.id}, req.body);
    })
    .then(result => res.status(200).send(result))
    .then(err => res.status(400).send(err));
})

app.delete('/ahente/:id',(req,res)=>{
    
    Ahente.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return Ahente.findOneAndDelete({"id":req.params.id});
    })
    .then(result => res.status(200).send(result))
    .then(err => res.status(400).send(err));
})


app.listen(PORT,()=>{
    console.log('Nakikinig na ang Express sa port:',PORT);
})