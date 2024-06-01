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
import ProtectedRoute from './Gaurds/ProtectedRoute/ProtectedRoute'
import AuthProtectedRoute from './Gaurds/AuthProtectedRoute/AuthProtectedRoute'
import './App.css'
import ProductDetails from './Components/ProductDetails/ProductDetails'

function App() {

  let router = createBrowserRouter([
    {
      path: '', element: <Layout/>, children:[
        {index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>},
        {path: 'login', element: <AuthProtectedRoute> <Login/> </AuthProtectedRoute>},
        {path: 'register', element: <AuthProtectedRoute> <Register/> </AuthProtectedRoute>},
        {path: 'products', element: <ProtectedRoute> <Products/> </ProtectedRoute>},
        {path: 'categories', element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
        {path: 'brands', element: <ProtectedRoute> <Brands/> </ProtectedRoute>} ,
        {path: 'cart', element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
        {path: 'orders', element: <ProtectedRoute> <Orders/> </ProtectedRoute>},
        {path: 'ProductDetails/:id/:categoryId', element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
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
