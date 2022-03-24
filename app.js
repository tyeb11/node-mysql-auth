const express=require('express');
const mysql=require('mysql');
const dotenv=require('dotenv');
const path=require('path');
const cookieParser=require('cookie-parser');


dotenv.config({
    path:'./.env'
})



const app=express();


const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})


const publicDir=path.join(__dirname,'./public')
app.use(express.static(publicDir))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.set('view engine','hbs')

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('MYSQL CONNECTED...')
    }
})





app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'))




app.listen(3000,()=>{
    console.log('Server Listening on Port 3000')
})