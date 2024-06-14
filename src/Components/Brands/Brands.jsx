import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Bubbles from '../Bubbles/Bubbles'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/brandsSlice'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Brands() {

  let dispatch = useDispatch()

  let { brands } = useSelector(store => store.brands)

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  return (
    <>
      <Helmet>
          <title>FreshCart - Brands</title>
      </Helmet>

      <Bubbles />

      {
      brands.length == 0 ? <Loading/> : <div className="grid grid-cols-6">
      {brands.map((brand, index)=>{
          return <>
            <div className="m-3 border shadow rounded-full">
            <Link to={"/Products/"+ brand._id}>
                <img src={brand.image} alt="" className='w-full rounded-full'/>
            </Link>
          </div>
          </>
      })}
      </div>
      }
    </>
  )
}
