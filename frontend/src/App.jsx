
import React from 'react'
import Products from './components/Product.jsx';
import productsData from './components/data.js';
import { BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
function App() {
  return (
  <Products products={productsData }/>
  )
}

export default App