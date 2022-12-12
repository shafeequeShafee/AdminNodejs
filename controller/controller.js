
const {Todos}=require("../model/Todos")

const SayHi=async(req,res)=>{
    try{
     
        res.send("hiii")
    }
    catch (error) {
        console.error(error);
        res.render("400");
    }  
}


module.exports ={
    SayHi
}
