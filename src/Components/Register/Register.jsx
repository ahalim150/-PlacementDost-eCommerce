import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Bubbles from '../Bubbles/Bubbles'

export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'name lengh must be more or equal to 3 characters').max(20, 'name lengh must be less or equal to 20 characters'),
    email: Yup.string().required('email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter valid email'),
    phone: Yup.string().required('phone number is required').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Enter a valid phone number'),
    password: Yup.string().required('password is required').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/, 'minimum eight character, at least one capital letter and a number'),
    rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'password and rePassword are not the same'),
  })

  const formik = useFormik({
    initialValues: {
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
    },
    onSubmit,
    validationSchema,
  })

  function onSubmit(){
    setIsLoading(true)
    setErrMsg("")

    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values)
    .then((response)=> {
      setIsLoading(false)
      navigate('/login')
    }).catch((err)=> {
      setIsLoading(false)
      setErrMsg(err.response.data.message)
    })
  }

  return (
    <>
      <Helmet>
          <title>FreshCart - Register</title>
      </Helmet>

      <Bubbles />

      <div className="bg-slate-100 p-5 rounded-md">
        <h1 className='text-2xl mb-7'>Register Now</h1>
        
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="John" />
                {formik.errors.name && formik.touched.name && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.name}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="john.doe@company.com" />
                {formik.errors.email && formik.touched.email && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.email}</p>}
            </div> 
            <div className="mb-2">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" />
                {formik.errors.phone && formik.touched.phone && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.phone}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" />
                {formik.errors.password && formik.touched.password && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.password}</p>}
            </div> 
            <div className="mb-2">
                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="•••••••••" />
                {formik.errors.rePassword && formik.touched.rePassword && <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{formik.errors.rePassword}</p>}
            </div>
            {errMsg && <div className="mb-2">
            <p className='bg-red-400 text-white text-sm p-1 rounded-md my-1'>{errMsg}</p>
            </div>}
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-green-600 hover:underline dark:text-green-500">terms and conditions</a>.</label>
            </div>
            <div className='flex'>
              <h1 className='mt-1 font-bold'>Have an account? <Link className='text-blue-700' to={'/login'}>Login Now</Link></h1>
              <button disabled={isLoading} type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {isLoading ? <i className='fa fa-spinner fa-spin mx-4'></i> : <span>Submit</span>}
              </button>
            </div>
        </form>
      </div>
    </>
  )
}
