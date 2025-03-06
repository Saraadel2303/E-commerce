import React, { useEffect ,useState } from 'react'
import { removeCartProduct, updateProductCount } from '../../../services/cartServices'
import { Button } from '@heroui/react'
import axios from 'axios';

export default function CartProduct({product , setCartID , setcartData , setNumberOfCartItems}) {
    const [isLoading, setIsLoading] = useState(false);
    const [incrementLoading, setIncrementLoading] = useState(false);
    const [decrementLoading, setDecrementLoading] = useState(false);
    const [productCount, setProductCount] = useState(product.count);

useEffect(() => {
  setProductCount(product.count)
  } , [product.count])



  return (
    <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
        <p className="mt-1 text-xs text-gray-700">${product.price}</p>
        <p className="text-md  text-gray-900 mt-2"> <span className='font-bold'>Category:</span> {product.product.category.name}</p>
        <p className="text-md  text-gray-900 mt-2"> <span className='font-bold'>Brand:</span> {product.product.brand.name}</p>
      </div>
      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div className="flex items-stretch border-gray-100">
          
          <Button 
          isLoading={decrementLoading}
           isDisabled={product.count == 1} 
           onPress={()=>
           updateProductCount(
           product.product._id 
           , product.count - 1 
           , product.count , 
           setcartData , 
           setNumberOfCartItems 
           , setIncrementLoading 
           , setDecrementLoading)} 
           className="min-w-4 p-0 rounded-none rounded-l
            bg-gray-100 py-1 px-3.5 duration-100
             hover:bg-blue-500 hover:text-blue-50   "> - </Button>

          <input value={productCount} min={1} 
           onBlur={(e)=>
           {
            ( e.target.value * 1 != product.count) &&
            updateProductCount(product.product._id ,
               product.count ,
                setcartData ,
                 setNumberOfCartItems , 
                 setIncrementLoading ,
                  setDecrementLoading)} 
           }
          onChange={(e)=> setProductCount(e.target.value)} class=" w-8 border bg-white text-center text-xs outline-none" type="number"  />

          <Button
           isLoading={incrementLoading}
            onPress={()=>
            updateProductCount(product.product._id ,
             product.count + 1 , 
             product.count ,
              setcartData ,
               setNumberOfCartItems , 
               setIncrementLoading ,
                setDecrementLoading)} 
                className=" min-w-4 p-0 rounded-none  
                rounded-r bg-gray-100 py-1 px-3 
                duration-100 hover:bg-blue-500 hover:text-blue-50"> + </Button>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">{product.count * product.price}</p>
         <Button isLoading={isLoading} variant='flat' className='px-2 min-w-0 bg-transparent' onPress={()=> removeCartProduct(product.product._id ,setCartID , setcartData , setNumberOfCartItems , setIsLoading)} endContent={<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 duration-150 hover:text-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>}>
         </Button>
        </div>
      </div>
    </div>
  </div>
  )
}
