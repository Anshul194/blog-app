const app = require("./app");
const userRouter=require('./routes/userRoute')
const Postrouter =require('./routes/postRoute')
const Port = 5001;
app.use("/", userRouter);
app.use("/",Postrouter)

app.listen(Port,()=>{
    console.log(`running on port${Port}`);
})