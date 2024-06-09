import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Product from '../Product/Product';
import { Helmet } from 'react-helmet';
import Bubbles from '../Bubbles/Bubbles';

export default function Products() {

    function getProducts(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let {data, isLoading, isFetching, isFetched, isStale, refetch} = useQuery('products', getProducts, {
        cacheTime: 5000,
        staleTime: 10000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        
    });

  return (
    <>
        <Helmet>
            <title>FreshCart - Products</title>
        </Helmet>

        <Bubbles />

        {/* <button onClick={refetch} className='text-white bg-green-500 px-2 rounded-md py-1'>Refresh</button> */}
        {
        isLoading ? <Loading/> : <div className="grid grid-cols-6">
        {data?.data.data.map((product, index)=>{
            return <Product product={product} key={index} />
        })}
        </div>
        }
    </>
  )
}
