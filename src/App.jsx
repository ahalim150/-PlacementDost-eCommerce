import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Orders from './Components/Orders/Orders'
import NotFound from './Components/NotFound/NotFound'
import AuthContextProvider from './Context/AuthContext'
import './App.css'

function App() {

  let router = createBrowserRouter([
    {
      path: '', element: <Layout/>, children:[
        {index: true, element: <Home />},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>},
        {path: 'products', element: <Products/>},
        {path: 'categories', element: <Categories/>},
        {path: 'brands', element: <Brands/>},
        {path: 'cart', element: <Cart/>},
        {path: 'orders', element: <Orders/>},
        {path: '*', element: <NotFound />}
    ]}
])

return (
  <>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </>
)
}

export default App
