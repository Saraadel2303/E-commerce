import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Slider from "react-slick";
import { Button } from '@heroui/react';
import { addProductToCart } from '../../../services/cartServices';
import { addProductToWishlist } from '../../../services/whishListServices';

export default function ProductDetails() {
   const {id} = useParams();
   const [productDetails, setProductDetails] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [addToCartLoading, setAddToCartLoading] = useState(false);
   const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);

   var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


   useEffect (()=>{
     getProductDetails()
   } , []);

   async function getProductDetails(){
    setIsLoading(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/` + id);
        setProductDetails(data.data);   
        setIsLoading(false) 
   }  
   if (isLoading) {
    return <LoadingScreen/>
   }
   
  return (
     
    <div className="flex items-center flex-wrap">
      
      <div className="w-full md:w-1/3 px-4 mb-8">
        <Slider {...settings}>
     {
        productDetails?.images.map((img , index)=>{
            return <img key={index} src={img} alt={productDetails?.title} className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage"/>
        })
     }
    </Slider>

      </div>

     
      <div className="w-full md:w-2/3 px-4">
        <h2 className="text-3xl font-bold mb-2">{productDetails?.title}</h2>
        <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">{productDetails?.price}</span>
          <span className="text-gray-500 line-through">{productDetails?.price + 100}</span>
        </div>
        <div className="flex items-center mb-4">

        {
                    [1,2,3,4,5].map((rate)=>{
                      return rate <= productDetails?.ratingsAverage ?
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-default-300">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>

                    })
         }

          <span className="ml-2 text-gray-600">{productDetails?.ratingsAverage} ({productDetails?.ratingsQuantity} reviews)</span>
        </div>
        <p className="text-gray-700 mb-6">{productDetails?.description}</p>

        <div className="flex items-center space-x-4 mb-6">
          <Button isLoading={addToCartLoading} onPress={()=>addProductToCart(productDetails?._id , setAddToCartLoading)} className="bg-slate-900 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </Button>

                       <Button isLoading={addToWishlistLoading} onPress={()=>addProductToWishlist(productDetails?._id , setAddToWishlistLoading)} className='bg-opacity-0'>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-10">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                       </Button>
        </div>
      </div>
    </div>

  )
}
