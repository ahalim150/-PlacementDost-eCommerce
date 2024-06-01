import React from 'react'
import { Link } from 'react-router-dom'

export default function Products({ product }) {
  return (
      <Link to={"/ProductDetails/"+ product._id + "/" + product.category._id}>
          <div className="p-3">
                <img src={product.imageCover} alt="" className='w-full'/>
                <h5 className='font-light text-green-400'>{product.category.name}</h5>
                <h4 className='font-bold'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <div className="flex justify-between">
                    <h6 className=''>{product.price} $</h6>
                    <h6><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</h6>
                </div>
                <button className='mt-3 w-full text-center bg-cyan-500 rounded text-white p-2 hover:bg-cyan-700'>Add to Cart</button>
          </div>
      </Link>
  )
}
