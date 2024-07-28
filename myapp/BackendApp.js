// const mongoose=require('mongoose');
// const express=require('express');
// require('dotenv').config();

// const app=express();
// app.use(express.json());
// const DB='mongodb+srv://cluster0.9o1c3rp.mongodb.net/" --apiVersion 1 --username vermaaman714600 --password Aman@600'
// const port=process.env.PORT||3000
// mongoose.connect(DB,{
//   useNewUrlParser:true,
// //   useCreateIndex:true,
//   useUnifiedTopology:true,
// //   useFindAndModify:false
// }).then(()=>{
//   console.log(`connection successful`);
// }).catch((err)=>console.log(`no connection`));

// app.get('/',(req,res)=>{
//     // res.send('./src/app.js')
//     res.send('hello pinki');
// })
// app.listen(port,()=>{
//     console.log(`server running on port ${3000}`)
// });