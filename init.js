let mongoose=require("mongoose");
let chat=require("./model/schema.js");
async function main(){
 await mongoose.connect("mongodb://127.0.0.1:27017/webwhatsapp");


}
main().then((res)=>{
    console.log(res);

}).catch((err)=>{
    console.log(err);
});


let datas=([{
    from:"rahmath",
    to:"amreen",
    msg:"hai amreen",
    date:new Date()
},{
from:"surya",
to:"sohel",
msg:"yera jumka",
date:new Date()},
{
    from:"vinay",
    to:"sravanth",
    msg:"handsome boy",
    date:new Date()}
])
chat.insertMany(datas);