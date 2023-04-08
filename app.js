const express = require('express')
const app = express();
const {config} = require('dotenv')
const Razorpay= require('razorpay');
var crypto = require("crypto");
config({path:'./config/config.env'})


app.use(express.json())
app.use(express.urlencoded({extended:true}))

 const instance = new Razorpay({
    key_id:"rzp_test_N31Is1PsQjtuFW",
    key_secret:"Hu7KimQqkrxueD4ybjU5vYv9",
})






app.post('/getdata', async(req,res) => {
try{
    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
     const order = await instance.orders.create(options)
    
    console.log(order)
    return res.json(order)
}
catch(err){
    console.log(err)
     res.status(500).json({err:"Wrong Something"})

}
    
})





app.post('/getkey',(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} =req.body;

    let body=razorpay_order_id + "|" + razorpay_payment_id;

    
    var expectedSignature = crypto.createHmac('sha256', 'Hu7KimQqkrxueD4ybjU5vYv9')
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
   
res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})







app.listen(process.env.PORT,()=>{
    console.log(`server is working on ${process.env.PORT}`)
})
