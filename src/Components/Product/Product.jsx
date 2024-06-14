import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartContext } from '../../Context/CartContext';

export default function Products({ product }) {

    const [isLoading, setIsLoading] = useState(false);

    const {setCartCount} = useContext(cartContext);

    async function addToCart(){
        setIsLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {productId: product._id}, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setIsLoading(false);
        setCartCount(data.numOfCartItems);

        toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            });
    }

  return (
          <div className="p-3">
            <Link to={"/ProductDetails/"+ product._id + "/" + product.category._id}>
                <img src={product.imageCover} alt="" className='w-full'/>
                <h5 className='font-light text-green-400'>{product.category.name}</h5>
                <h4 className='font-bold'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <div className="flex justify-between">
                    <h6 className=''>{product.price} EGP</h6>
                    <h6><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</h6>
                </div>
            </Link>
                <button disabled={isLoading} onClick={addToCart} className='mt-3 w-full text-center bg-[#0AAD0A] rounded text-white p-2 hover:bg-[#308330]'>
                    {isLoading
                    ? <i className='fas fa-spinner fa-spin'></i>
                    : 'Add to Cart'
                    }
                </button>
          </div>
  )
}
