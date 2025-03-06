
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import AuthContextProvider from './contexts/authContext'
import Categories from './pages/Categories/Categories'
import Brands from './pages/Brands/Brands'
import Cart from './pages/Cart/Cart'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify';
import Address from './pages/Address/Address'
import Orders from './pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './pages/WishList/WishList'
import ForgetPssword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPssword from './components/ResetPassword/ResetPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'

const queryClient = new QueryClient()








const router = createBrowserRouter([
{
  path:'' , element:<MainLayout/> , children:[
    {index: true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'/Login' , element:<ProtectedAuthRoute><Login/></ProtectedAuthRoute>} ,
    {path:'/Register' , element:<ProtectedAuthRoute><Register/></ProtectedAuthRoute>},
    {path:'/ForgetPassword' , element:<ForgetPssword/>},
    {path:'/VerifyCode' , element:<VerifyCode/>},
    {path:'/ResetPassword' , element:<ResetPassword/>},
    {path:'/categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'/brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'/cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'/wishList' , element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'/productDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/allOrders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'/address/:cartId' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path: '*' , element:<NotFound/>}
  ]
}
])

function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer/>
    <ReactQueryDevtools/>
    </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
