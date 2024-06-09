import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let cartContext = createContext(0);

export default function CartContextProvider({ children }) {

    const [cartCount, setCartCount] = useState(0);

    async function getLoggedUserCart(){
        try {
          let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        setCartCount(data.numOfCartItems);
        // setCartData(data);
        } catch (error) {
        //   setCartData(undefined);
        }
    }

    useEffect(() => {
        getLoggedUserCart();
      }, [])

  return <cartContext.Provider value={{ cartCount, setCartCount }}>
    { children }
  </cartContext.Provider>
}
