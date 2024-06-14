import React from 'react';

export default function wishListProduct({product, removeWishListItem}) {

    return (
        <div className="flex p-5 shadow mb-3 justify-between">
            <div className='flex items-center'>
                <img className='w-28' src={product.imageCover} alt="" />
                <div className='ms-3'>
                    <h2 className='font-bold'>{product.title}</h2>
                </div>
            </div>
            <div>
                <button onClick={() => removeWishListItem(product._id)} className='text-red-600'>Remove <i class="fa-regular fa-heart"></i></button>
            </div>
        </div>
    );
}
