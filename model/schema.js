let mongoose = require("mongoose");
let schema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }

})
let chat=mongoose.model("chat",schema);
module.exports=chat;