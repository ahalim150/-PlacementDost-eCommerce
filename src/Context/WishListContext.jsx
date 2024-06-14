import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let wishListContext = createContext(0);

export default function WishListContextProvider({ children }) {

    const [wishListCount, setWishListCount] = useState(0);

    async function getLoggedUserWishList(){
        try {
          let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        setWishListCount(data.data.length);
        } catch (error) {

        }
    }

    useEffect(() => {
        getLoggedUserWishList();
      }, [])

  return <wishListContext.Provider value={{ wishListCount, setWishListCount }}>
    { children }
  </wishListContext.Provider>
}
