import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { classNames } from '../../assets/Helpers/strings';
import { Tab } from '@headlessui/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { cartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet';
import Bubbles from '../Bubbles/Bubbles';

export default function ProductDetails() {

    const [productDetails, setProductDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [isWishListLoading, setIsWishListLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isWishListAdded, setIsWishListAdded] = useState(false);
    const { id, categoryId } = useParams();

    const { setCartCount } = useContext(cartContext);
    const { setWishListCount } = useContext(wishListContext);

    async function getProductDetails(productId) {
        setIsLoading(true);
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId);
        setProductDetails(data.data);
        setIsLoading(false);
    }

    async function getProductsByCategoryId(categoryId) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products?category[in]=" + categoryId);
        setRelatedProducts(data.data);
    }

    async function addToCart() {
        setIsCartLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: id }, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setIsCartLoading(false);
        setCartCount(data.numOfCartItems);

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

    async function addToWishList() {
        setIsWishListLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: id }, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setIsWishListLoading(false);
        setWishListCount(data.data.length);
        setIsWishListAdded(!isWishListAdded);

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

    async function removeFromWishList() {
        setIsWishListLoading(true);
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        setIsWishListLoading(false);
        setWishListCount(data.data.length);
        setIsWishListAdded(false);
    
        toast.warn(data.message, {
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

    async function checkIfInWishlist() {
        setIsWishListLoading(true);
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem("token")
            }
        });
        const productInWishlist = data.data.some(product => product.id === id);
        setIsWishListAdded(productInWishlist);
        setIsWishListLoading(false);
    }

    const handleWishListClick = () => {
        if (isWishListAdded) {
            removeFromWishList();
        } else {
            addToWishList();
        }
    };

    useEffect(() => {
        getProductDetails(id);
        checkIfInWishlist();
    }, [id]);

    useEffect(() => {
        getProductsByCategoryId(categoryId);
    }, [categoryId]);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <>
                <Helmet>
                    <title>FreshCart - Detailed</title>
                </Helmet>

                <Bubbles />

                <div className="bg-white">

                    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            {/* Product */}
                            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
                                {/* Image gallery */}
                                <Tab.Group as="div" className="flex flex-col-reverse">
                                    {/* Image selector */}
                                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                        <Tab.List className="grid grid-cols-4 gap-6">
                                            {productDetails?.images.map((image, index) => (
                                                <Tab
                                                    key={index}
                                                    className="relative flex h-16 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className="absolute inset-0 overflow-hidden rounded-md">
                                                                <img src={image} alt="" className="h-full w-full object-cover object-center" />
                                                            </span>
                                                            <span
                                                                className={classNames(
                                                                    selected ? 'ring-indigo-500' : 'ring-transparent',
                                                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>

                                    <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                                        {productDetails?.images.map((image) => (
                                            <Tab.Panel key={image.id}>
                                                <img
                                                    src={image}
                                                    alt={image}
                                                    className="h-full w-full object-cover object-center sm:rounded-lg"
                                                />
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                {/* Product info */}
                                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productDetails?.title}</h1>

                                    <div className="mt-3">
                                        <h2 className="sr-only">Product information</h2>
                                        <p className="text-3xl tracking-tight text-gray-900">{productDetails?.price} $</p>
                                    </div>

                                    {/* Reviews */}
                                    <div className="mt-3">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            productDetails?.ratingsAverage > rating ? 'text-indigo-500' : 'text-gray-300',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{productDetails?.ratingsAverage} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="sr-only">Description</h3>

                                        <div
                                            className="space-y-6 text-base text-gray-700"
                                            dangerouslySetInnerHTML={{ __html: productDetails?.description }}
                                        />
                                    </div>

                                    <div className="mt-10 flex">
                                        <button disabled={isCartLoading} onClick={addToCart}
                                            type="submit"
                                            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        >
                                            {isCartLoading
                                                ? <i className='fas fa-spinner fa-spin'></i>
                                                : 'Add to Cart'
                                            }
                                        </button>

                                        <button disabled={isWishListLoading} onClick={handleWishListClick}
                                            type="button"
                                            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                        >
                                            {isWishListAdded ? (
                                                <SolidHeartIcon className="h-6 w-6 flex-shrink-0 text-red-500" aria-hidden="true" />
                                            ) : (
                                                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                            )}
                                            <span className="sr-only">Add to favorites</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                      <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                          <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                              Customers also bought
                          </h2>

                          <RelatedProducts relatedProducts={relatedProducts} />
                      </section>
                  </div>
              </main>

            </div>
        </>
      )
  }
}
