import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Products from '../Products/Products';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';

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
      <CategoriesSlider />

      {
      products.length == 0 ?
      <Loading/>
      : 
      <div className="grid grid-cols-6">
      {products.map((product, index)=>{
          return <Products product={product} key={index} />
      })}
      </div>
      }
        
    </>
  )
}
