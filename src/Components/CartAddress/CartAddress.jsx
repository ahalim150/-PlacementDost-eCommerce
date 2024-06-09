import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Bubbles from '../Bubbles/Bubbles'

export default function CartAddress() {

let { cartId } = useParams()

const [isLoading, setIsLoading] = useState(false);
const [errMsg, setErrMsg] = useState("");
const navigate = useNavigate();

const validationSchema = Yup.object({
  details: Yup.string().required('Details is required').min(3, 'Details lengh must be more or equal to 3 characters').max(20, 'Details lengh must be less or equal to 20 characters'),
  city: Yup.string().required('City is required').min(3, 'City lengh must be more or equal to 3 characters').max(20, 'City lengh must be less or equal to 20 characters'),
  phone: Yup.string().required('phone number is required').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Enter a valid phone number'),
})

const formik = useFormik({
  initialValues: {
    "details": "",
    "city": "",
    "phone":""
  },
  onSubmit,
  validationSchema,
})

function onSubmit(){
  setIsLoading(true);
  setErrMsg("");
  checkOut(formik.values);
}

async function checkOut(cartaddress){
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
      "shippingAddress": cartaddress
    }, {
      params: {
        url: "http://localhost:5173"
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
    setIsLoading(false);
    window.open(data.session.url, '_self')
  }

return (
  <>
    <Helmet>
        <title>FreshCart - Shipping</title>
    </Helmet>

    <Bubbles />

    <div className="bg-slate-100 p-5 rounded-md">
      <h1 className='text-2xl mb-7'>Delivery Address</h1>
      
      <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
              <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details</label>
              <input name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Details" />
              {formik.errors.details && formik.touched.details && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.details}</p>}
          </div>
          <div className="mb-2">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
              <input name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="USA" />
              {formik.errors.city && formik.touched.city && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.city}</p>}
          </div>
          <div className="mb-2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
              <input name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" />
              {formik.errors.phone && formik.touched.phone && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.phone}</p>}
          </div>
          {errMsg && <div className="mb-2">
          <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{errMsg}</p>
          </div>}
          <button disabled={isLoading} type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading ? <i className='fa fa-spinner fa-spin mx-4'></i> : <span>CheckOut</span>}
          </button>
      </form>
    </div>
  </>
)

}
