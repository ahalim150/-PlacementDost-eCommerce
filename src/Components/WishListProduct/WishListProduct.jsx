import React from 'react';

export default function wishListProduct({product, removeWishListItem, addToCart}) {

    return (
        <div className="flex p-5 shadow mb-3 justify-between">
            <div className='flex items-center'>
                <img className='w-28' src={product.imageCover} alt="" />
                <div className='ms-3'>
                    <h2 className='font-bold'>{product.title}</h2>
                </div>
            </div>
            <div className='flex flex-col justify-evenly'>
                <button onClick={() => removeWishListItem(product._id)} className='text-red-600'>Remove <i class="fa-solid fa-trash"></i></button>
                <button onClick={() => addToCart(product._id)} className='text-green-600'>Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    );
}
