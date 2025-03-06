import { Button } from '@heroui/react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { addProductToCart } from '../../../services/cartServices';
import WishListProduct from '../../components/WishListProduct/WishListProduct';

export default function WishList() {
  const [addToCartLoading, setAddToCartLoading] = useState(null)

  
 function getWishlist(){
 return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {
    headers : {
      token : localStorage.getItem("token")
    }
  })
  }

  const {data , isLoading , isFetching , refetch} =  useQuery({
    queryKey: ['whishlist'],
    queryFn: getWishlist,
    select: (res)=> res.data.data,
  })

   if (isLoading) {
      return <LoadingScreen/>
    }

  
  
  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div className="flex flex-col jusitfy-start items-start">
                <div className="mt-3">
                    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">My Whish List</h1>
                </div>
               <div className="grid grid-cols-3 gap-3 w-full">
               {
                data?.map((whishlist , index)=>{
                   return <WishListProduct whishlist={whishlist} key={index} refetch={refetch}/>

                })
               }
               </div>
                </div>
            </div>
       
  )
}

