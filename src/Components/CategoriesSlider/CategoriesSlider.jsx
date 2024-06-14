import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategoriesSlider() {
    
    const [categories, setCategories] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
      };

      async function getCategories(){
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategories(data.data)
      }

      useEffect(() => {
        getCategories()
      }, [])

  return (
     <div className="">
        <h2 className='my-4'>Shop Popular Categories</h2>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div className='h-52 border shadow-black px-1'>
                        <img src={category.image} className='w-full h-full' alt="" />
                    </div>
                ))}
            </Slider>
        </div>
  )
}
