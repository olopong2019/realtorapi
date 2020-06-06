const mongoose = require('mongoose');
const moment = require('moment');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var ahenteSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique:true,
        default: parseInt(moment(new Date()).format('mmssSSS'))
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    mobileNo:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    joinDate:{
        type: Date
    },
    SeminarDate:{
        type: Date,
        //default: Date.now()
    },
    idExpiryDate:{
        type: Date,
        //default: Date.now()
    }
});

ahenteSchema.methods.GenerateJWTToken = function(callback){
    bcrypt.hash(this.password,10,(err,hashed_pw)=>{
        this.password = hashed_pw;
        this.save()
            .then(result => {
                console.log(result);
                callback({status: 'Success',
                                token: jwt.sign({id:this.id,name: this.name,mobileNo: this.mobileNo,address: this.address,
                                    email:this.email,password: this.password,joinDate:this.joinDate,SeminarDate:this.SeminarDate,
                                    idExpiryDate:this.idExpiryDate},'key123456')
                                });
            })
            .catch(err => {
                callback({status: "error",
                ErrorDetails: err});
            });
        })
}

ahenteSchema.statics.verifyJWTToken = function(token){
    var decoded;
    try{
        decoded = jwt.verify(token,'key123456');
        return Promise.resolve(decoded);
    }catch(error){
        return Promise.reject(error);
    }
}

var ahenteModel = mongoose.model('ahente',ahenteSchema);

module.exports = ahenteModel;