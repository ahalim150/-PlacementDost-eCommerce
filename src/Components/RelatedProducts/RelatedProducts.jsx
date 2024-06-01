import React from 'react'
import Slider from 'react-slick'
import RelatedProduct from '../RelatedProduct/RelatedProduct';

export default function RelatedProducts({relatedProducts}) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
      };

  return (
        <div className="mt-8">
            <Slider {...settings}>
                {relatedProducts.map((product) => (
                   <RelatedProduct product={product} key={product._id} />
                ))}
            </Slider>
        </div>
  )
}
