import React from 'react'
import '../styles/Products.css';
import axios from 'axios';


function Products({products}) {
  const checkoutHandler=async(amount)=>{
    const {data:keyData}=await axios.get("/api/v1/getKey");
    const {key}=keyData
    
   const {data:orderData} =await axios.post("/api/v1/payment/process",{
    amount
   });
   const {order}=orderData;
   console.log(order);
   
      // Open Razorpay Checkout
      const options = {
        key, 
        amount,
        currency: 'INR',
        name: 'regno',
        description: 'Rajor pay Intigration tutorial',
        order_id: order.id, 
        callback_url: '/api/v1/paymentVerification',
        prefill: {
          name: 'rahul',
          email: 'rahul@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#192bff'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    
  }
  return (

    <div className="products-container">
      { products.map((item)=>(
        <div className="product-card" key={item.id}>
        <img src= {item.image} alt={item.title}className='product-image' />
        <h3 className='product-title'>{item.title}</h3>
        <p className='product-price'>price<strong>{item.price}</strong></p>
        <button className='pay-button' onClick={()=>checkoutHandler(item.price)}>Pay({item.price})/-</button>
      </div>
      ))
    }
    </div>
  )
}

export default Products