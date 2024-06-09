import React, { useState } from 'react'

export default function CartProduct({product, removeCartItem, updateProductCount}) {

    const [count, setCount] = useState(product.count)

  return (
    <div className="flex p-5 shadow mb-3 justify-between">
    <div className='flex items-center'>
      <img className='w-28' src={product.product.imageCover} alt="" />
      <div className='ms-3'>
        <h2 className='font-bold'>{product.product.title}</h2>
        <p className='text-lime-700'>{product.product.category.name}</p>
        <p className=''>{product.price} $</p>
        <p className=''>{product.product.ratingsAverage} <i className='fa-regular fa-star text-yellow-400'></i></p>
      </div>
    </div>
    <div>
      <button onClick={ () => removeCartItem(product.product._id) } className='text-red-600'>Remove <i className='fa-solid fa-trash'></i></button>
      <div className='mt-10'>
        <button onClick={ () => {updateProductCount(product.product._id, product.count - 1); setCount(product.count - 1)}} className='font-bold mx-2 border px-2 rounded-md'>-</button>
        <span>{count}</span>
        <button onClick={ () => {updateProductCount(product.product._id, product.count + 1); setCount(product.count + 1)}} className='font-bold mx-2 border px-2 rounded-md'>+</button>
      </div>
    </div>
  </div>
  )
}
