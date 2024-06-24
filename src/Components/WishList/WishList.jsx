import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import WishListProduct from '../WishListProduct/WishListProduct';
import { toast } from 'react-toastify'
import { wishListContext } from '../../Context/WishListContext';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import Bubbles from '../Bubbles/Bubbles';

export default function WishList() {

  const [wishListData, setWishListData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const {setCartCount} = useContext(cartContext);

  const {setWishListCount} = useContext(wishListContext);

  async function getLoggedUserWishList(){
    setIsLoading(true)
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data)
    setWishListData(data.data);
    } catch (error) {
      setWishListData(undefined);
    }
    setIsLoading(false);
  }

  async function removeWishListItem(productId){

    let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));
    let newProducts = wishListDataCopy.filter((product) => {
      return product._id != productId
    })
    wishListDataCopy = newProducts;
    setWishListData(wishListDataCopy);

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

    let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setWishListData(wishListDataCopy);
    setWishListCount(data.data.length);
  }

  async function addToCart(productId){
    setBtnLoading(true);
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {productId}, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    setBtnLoading(false);
    setCartCount(data.numOfCartItems);
    // removeWishListItem(productId)

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

  useEffect(() => {
    getLoggedUserWishList();
  }, [])

  return (
    <>
        <Helmet>
            <title>FreshCart - WishList</title>
        </Helmet>

        <Bubbles />
          
          { isLoading && <Loading/> }
          
          { !isLoading && <>
            {
              wishListData?.map((product, index) => {
                return <WishListProduct  key={index} product={product} removeWishListItem={removeWishListItem} addToCart={addToCart}/>
              })
            }
          </>
          }

          { !isLoading && (wishListData == undefined || wishListData?.length == 0) && <h1 className='text-center my-12'>Your WishList Is Empty</h1> }

        </>
  )
}
