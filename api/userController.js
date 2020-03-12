const express=require('express')
var router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')

router.use(express.json());

router.get('/',(req,res)=>{
    res.render("home")
})

router.post('/',(req,res)=>{
    addUser(req,res);
})

router.post('/signin',(req,res)=>{
    User.findOne({userid:req.body.userid},(err,doc)=>{
        if(!err){
            if(doc==null) console.log('User does not exist')
            else if(doc.password==req.body.password)
                console.log('Signin successful')
            else console.log('Incorrect password')
        }
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("home",{user:req.body})
            }
            else console.log('err in signing in')
        }
    })
})

function addUser(req,res){
    var user=new User();
    user.name=req.body.name;
    user.userid=req.body.userid;
    user.password=req.body.password;
    user.followers=[];
    user.following=[];
    user.posts=[];
    user.save((err,doc)=>{
        if(!err) console.log('Signup successful')
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("home",{user: req.body})
            }
            else console.log('error in Signing up')
        }
    })
}

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name':
                body['nameError']=err.errors[field].message;
                break;
            case 'userid':
                body['useridError']=err.errors[field].message;
                break;
            case 'password':
                body['passwordError']=err.errors[field].message;
                break;
            default: break;
        }
    }
}

module.exports=router;