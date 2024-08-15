let mongoose=require("mongoose");
let express=require("express");
let path=require("path");
let app= express();
let port=8700;
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
let chat=require("./model/schema.js");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

main().then((res)=>{
    console.log(res);
}).catch((er)=>{
    console.log(er);
});
async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/webwhatsapp");
}
/*let chat1=new chat({
    from:"raju",
    to:"sridevi",
    msg:"waste of them",
    date:new Date()
})
chat1.save().then((res)=>{
    console.log(res);
});
*/
app.get("/",(req,res)=>{
    res.send("it is working fine");
})

app.get("/chats",async(req,res)=>{
    let chats= await chat.find(); //all data
    res.render("index.ejs",{chats});
    console.log(chats);
});

//crate a new route
app.post("/chat",(req,res)=>{
    let{from,msg,to}=req.body; //this new chat to insert it
    let newchat= new chat({
        from:from,
        msg:msg,
        to:to,
        date: new Date()
    });
    console.log(newchat);

newchat.save().then((res)=>{
    console.log("saved");
   
}).catch((err)=>{
    console.log(err);
});

res.redirect("/chats");
});
app.get("/chats/new",async(req,res)=>{
    res.render("newchat")
});


    //edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
   let i= await chat.findById(id);
    res.render("edit",{i})
});
app.listen(8700,()=>{
    console.log("working nice")
    

});


//updated route
app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let {msg:nmsg}=req.body;
    let chay= await chat.findByIdAndUpdate(id,{msg:nmsg},{trueValidators:true,new:true});
   console.log(chay);
   res.redirect("/chats");
})



//delete route
app.delete("/chats/:id", async(req,res)=>{
    let{id}=req.params;
   let v= await chat.findById(id)
   console.log(v);
   res.redirect("/chats");
});
