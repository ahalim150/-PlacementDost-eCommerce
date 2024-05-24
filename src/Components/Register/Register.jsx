import React from 'react'
import { useFormik } from 'formik'

export default function Register() {

  const formik = useFormik({
    initialValues: {
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone":""
    },
    onSubmit: Register,
    validate: validation

  })

  function Register(){
    console.log(formik.values);
  }

  function validation(){
    console.log("Hi");
  }

  return (
    <>
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
                <input name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
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
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800" />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-green-600 hover:underline dark:text-green-500">terms and conditions</a>.</label>
            </div>
            <button type="submit" className="text-white ms-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
        </form>

      </div>
    </>
  )
}
