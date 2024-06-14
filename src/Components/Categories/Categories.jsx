import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Bubbles from '../Bubbles/Bubbles'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../Redux/categoriesSlice'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import style from '../Categories/Categories.module.css'


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
      categories.length == 0 ? <Loading/> : <div className="grid grid-cols-4">
      {categories.map((category, index)=>{
          return <>
            <Link to={"/Products/"+ category._id}>
              <div className={style.card}>
                <div className={style["image-box"]}>
                  <img src={category.image} />
                </div>
                <div className={style['content-box']}>
                  <div className={style.content}>
                    <h6>{category.name}</h6>
                  </div>
                </div>
              </div>
            </Link>
          </>
      })}
      </div>
      }
      
    </>
  )
}
