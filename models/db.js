const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/gaq',{useNewUrlParser:true}, (err)=>{
    if(!err) console.log('MongoDB connected succesfully')
    else console.log('error in connecting MongoDB')
})

require('./user.model')