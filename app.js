//npm install --save-dev nodemon

const express = require('express');
const mongoose = require("mongoose")
const app = express();
const url='mongodb://localhost/SfqDBex';
const cors = require('cors')

const {users}=require('./user/data')
const {authUser, authRole}=require('./auth/basicAuth')
const {ROLE}= require("./user/data")


app.use(cors())  


app.use(express.json())

app.use(express.urlencoded({ extended: true }))  

mongoose.connect(url, { useNewUrlParser: true })  //warning oyivakkaan {}
const con = mongoose.connection  // we will hold on connection
con.on('open', function () {
    console.log("connected...")
})

app.use(setUser)

const projectRouter= require("./router/router")
app.use('/projects',projectRouter)
app.get('/',(req,res)=>{
    res.send('HomePage')
})

app.get('/dashboard',(req,res)=>{
    res.send('DashBoardPage')
})

app.get('/admin',authUser,authRole(ROLE.ADMIN),(req,res)=>{
    res.send('AdminPage')
})

function setUser(req,res,next){
    const userId = req.body.userId
    if(userId){
        req.user = users.find(user => user.id === userId)
    }
    next()
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("server is running 0n 4000")
})


