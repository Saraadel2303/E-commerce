import React, { useState } from 'react'
import { addProductToCart } from '../../../services/cartServices'
import { Button } from '@heroui/react';
import { removeWishlistProduct } from '../../../services/whishListServices';

export default function WishListProduct({whishlist , refetch}) {
 const [addToCartLoading, setAddToCartLoading] = useState(false);
 const [removewhishlistLoading, setremoveWhishlistLoading] = useState(false)


  return (
  
                    <div className=" mt-10  shadow-lg rounded-lg pt-3 pb-3">
                      <div className="flex flex-col">
                          <div className="relative">
                              <img className="block" src={whishlist.imageCover} alt="bag" />
                              <Button isLoading={removewhishlistLoading} onPress={()=>removeWishlistProduct(setremoveWhishlistLoading , refetch , whishlist._id)} aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute  p-1.5 bg-gray-800 text-white hover:text-gray-400">
                                  <svg className="fil-current" width={12} height={12} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                              </Button>
                          </div>
                          <div className="mt-6 flex flex-col items-center">
                                  <p className="tracking-tight text-sm font-semibold leading-6 text-gray-800 line-clamp-1">{whishlist.title}</p>
                                  <p className="tracking-tight text-base font-medium leading-4 text-gray-800 mt-3">${whishlist.price}</p>
                                  <Button isLoading={addToCartLoading} onPress={()=>addProductToCart(whishlist?._id , setAddToCartLoading)} className="bg-slate-900 flex gap-2 mt-4 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                              stroke-width="1.5" stroke="currentColor" className="size-6">
                                                              <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                          </svg>
                                                          Add to Cart
                                                      </Button>
                          </div>
                      </div>
                      </div>
    
          
)
}
