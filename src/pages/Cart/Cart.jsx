import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import CartProduct from '../../components/CartProduct/CartProduct'
import { clearCart, getCart } from '../../../services/cartServices'
import { Button } from '@heroui/react'
import { h1 } from 'framer-motion/client'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Cart() {

  const [cartId, setCartID] = useState(null)
  const [cartData, setcartData] = useState(null)
  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [clearCartIsLoading, setClearCartIsLoading] = useState(false)

  useEffect(()=>{
    getCart(setIsLoading , setCartID , setcartData , setNumberOfCartItems);
  } , [])

if (isLoading) {
  return <LoadingScreen/>
}

  return (
    <>
    
    <div className='flex justify-between'>
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({numberOfCartItems})</h1>
    {
      !!numberOfCartItems &&
      <Button isLoading={clearCartIsLoading} 
    onPress={()=> clearCart(setClearCartIsLoading , setCartID , setcartData , setNumberOfCartItems)} 
    className='text-red-700 bg-transparent min-w-4'>Clear</Button>
    }
    </div>
    {
      numberOfCartItems ?
      <div className=" justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
       
       {
        cartData?.products.map((product , index)=>{
          return <CartProduct product={product} 
          key={index} 
          setCartID={setCartID} 
          setcartData={setcartData}
          />

        })
       }
       
      </div>

      {/* Sub total*/}
      <div className="mt-6 sticky top-20 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">{cartData?.totalCartPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Shipping</p>
          <p className="text-gray-700">$4.99</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{cartData?.totalCartPrice + 4.99 } USD</p>
            <p className="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <Link to={"/address/" + cartId}  className="mt-6 block text-center w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
      </div>
    </div>
    :
    <h1 className='text-center font-bold text-2xl'>No Product in Your Cart</h1>
    }

    </>
  
  )
}
