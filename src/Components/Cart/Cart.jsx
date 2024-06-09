import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import CartProduct from '../CartProduct/CartProduct';
import { toast } from 'react-toastify'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import CartAddress from '../CartAddress/CartAddress';
import { Helmet } from 'react-helmet';
import { Offline, Online } from 'react-detect-offline';
import Bubbles from '../Bubbles/Bubbles';

export default function Cart() {

  const [cartData, setCartData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {setCartCount} = useContext(cartContext);

  async function getLoggedUserCart(){
    setIsLoading(true)
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setCartData(data);
    } catch (error) {
      setCartData(undefined);
    }
    setIsLoading(false);
  }

  async function removeCartItem(productId){

    let cartDataCopy = JSON.parse(JSON.stringify(cartData));
    let newProducts = cartDataCopy.data.products.filter((product) => {
      return product.product._id != productId
    })
    cartDataCopy.data.products = newProducts;
    setCartData(cartDataCopy);

    toast.warn("Your product has been removed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      });

    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCartData(data);
    setCartCount(data.numOfCartItems);
  }

  async function clearCart(){

    toast.error("Your cart is now Empty", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      });

    setIsLoading(true)
    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCartData(undefined);
    setIsLoading(false);
    setCartCount(data.numOfCartItems);
  }

  async function updateProductCount(productId, productCount){
    if(productCount < 1 ){
        removeCartItem(productId);
    }else{
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, { count: productCount},{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      setCartData(data);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, [])

  return (
    <>
        <Helmet>
            <title>FreshCart - Cart</title>
        </Helmet>

        <Bubbles />

        <Online>
          {cartData?.data.products.length > 0 &&
            <button disabled={isLoading} onClick={clearCart} className='block ms-auto mb-8 text-red-600 border border-red-600 px-2 rounded hover:bg-red-600 hover:text-white delay-100'>Clear Cart</button>
          }
          
          { isLoading && <Loading/> }
          
          { !isLoading && <>
            {
              cartData?.data.products.map((product, index) => {
                return <CartProduct  key={index} product={product} removeCartItem={removeCartItem} updateProductCount={updateProductCount}/>
              })
            }
            <div className='flex justify-between mb-5'>
                <Link to={"/cartaddress/" + cartData?.data._id} className='text-white bg-green-500 px-2 rounded-md py-1'>Checkout</Link>
                <h3>Total Cart Price: {cartData?.data.totalCartPrice} $</h3>
            </div> 
          </>
          }

          { !isLoading && (cartData == undefined || cartData?.data.products.length == 0) && <h1 className='text-center my-12'>Your Cart Is Empty</h1> }
        </Online>
        <Offline> Cart only shows when Online</Offline>

        </>
  )
}
