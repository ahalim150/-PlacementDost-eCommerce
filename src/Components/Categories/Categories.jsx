import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Bubbles from '../Bubbles/Bubbles'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../Redux/categoriesSlice'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'


export default function Categories() {

  let dispatch = useDispatch()

  let { categories } = useSelector(store => store.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      <Helmet>
          <title>FreshCart - Categories</title>
      </Helmet>

      <Bubbles />

      {
      categories.length == 0 ? <Loading/> : <div className="grid grid-cols-3">
      {categories.map((category, index)=>{
          return <>
            <div className="m-3 border shadow rounded-full bg-[#0AAD0A]">
            <Link to={"/Products/"+ category._id}>
                <img src={category.image} alt="" className='w-full h-56 rounded-full'/>
                <div className="flex justify-between">
                    <h6 className='font-bold mx-auto text-white'>{category.name}</h6>
                </div>
            </Link>
          </div>
          </>
      })}
      </div>
      }
      
    </>
  )
}
