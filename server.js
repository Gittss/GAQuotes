const express=require('express')
require('./models/db')
const path=require('path')
const exphand=require('express-handlebars')
const bodyparser=require('body-parser')
const usercontroller=require('./api/userController')

var app=express()
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',exphand({extname:'hbs', defaultLayout:'home', layoutsDir:__dirname + '/views/' }));
app.set('view engine', 'hbs');


app.listen(3000,()=>{
    console.log('Express server started at port 3000')
})

app.use('/',usercontroller)