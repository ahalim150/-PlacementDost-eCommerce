import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import Sale from '../Sale/Sale';
import Bubbles from '../Bubbles/Bubbles';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';


export default function Home() {

  const [products, setProducts] = useState([])

  async function getProducts(){
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data)
  }

  useEffect(()=>{
    getProducts();
  }, [])


  return (
    <>
      <Helmet>
        <title>FreshCart - Home</title>
      </Helmet>

      <Bubbles />

      <CategoriesSlider />

      {
      products.length == 0 ? <Loading/> : <div className="mt-5 grid grid-cols-6">
      {products.map((product, index)=>{
          return <Product product={product} key={index} />
      })}
      </div>
      }
      
      <Sale />
    </>
  )
}
