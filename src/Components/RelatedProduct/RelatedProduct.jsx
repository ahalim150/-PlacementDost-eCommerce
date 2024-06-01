import React from 'react'
import { Link } from 'react-router-dom'

export default function RelatedProduct({product}) {
  return (
    <div className='px-2'>
    <div className="relative">
    <div className="relative h-72 w-full overflow-hidden rounded-lg">
    <img 
    src={product.imageCover} 
    alt={product.title}
    className='h-full w-full object-cover object-center'
    />
    </div>
    <Link to={"/ProductDetails/"+ product._id + "/" + product.category._id}>
    <div className='relative mt-4'>
    <h3 className='text-sm font-medium text-gray-900'>{product.title}</h3>
    </div>
    </Link>
    <div className='absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg px-4'>
    <div
    aria-hidden = 'true'
    className="absolute inset-x-0 buttom-0 h-36 bg-gradient-to-t from-black opacity-50"
    />
    <p className='relative text-lg font-semibold text-white'>{product.price} $</p>
    </div>
    </div>
    <div className="mt-6">
    <button
    className='relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2'
    >
    Add to bag <span className='sr-only'>, {product.title}</span>
    </button>
    </div>
    </div>
  )
}
