import React, { useState } from 'react';

export default function CartProduct({product, removeCartItem, updateProductCount}) {
  
    const [count, setCount] = useState(product.count);

    const handleDecreaseCount = () => {
        if (count > 1) {
            updateProductCount(product.product._id, count - 1);
            setCount(count - 1);
        }
    };

    const handleIncreaseCount = () => {
        updateProductCount(product.product._id, count + 1);
        setCount(count + 1);
    };

    return (
        <div className="flex p-5 shadow mb-3 justify-between">
            <div className='flex items-center'>
                <img className='w-28' src={product.product.imageCover} alt="" />
                <div className='ms-3'>
                    <h2 className='font-bold'>{product.product.title}</h2>
                    <p className='text-lime-700'>{product.product.category.name}</p>
                    <p className=''>{product.price} EGP</p>
                    <p className=''>{product.product.ratingsAverage} <i className='fa-regular fa-star text-yellow-400'></i></p>
                </div>
            </div>
            <div>
                <button onClick={() => removeCartItem(product.product._id)} className='text-red-600'>Remove <i className='fa-solid fa-trash'></i></button>
                <div className='mt-10'>
                    <button onClick={handleDecreaseCount} className='font-bold mx-2 border px-2 rounded-md'>-</button>
                    <span>{count}</span>
                    <button onClick={handleIncreaseCount} className='font-bold mx-2 border px-2 rounded-md'>+</button>
                </div>
            </div>
        </div>
    );
}
