import app from './app.js';
import dotenv from 'dotenv';
import { response } from 'express';
import Razorpay from 'razorpay';
dotenv.config({path:"backend/config/config.env"});

const port=process.env.PORT || 3000;

export const instance= new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET,
})


app.listen(process.env.PORT,()=>{
console.log(`server is running on ${process.env.PORT}`)
 
})