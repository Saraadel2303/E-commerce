import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import { Button } from '@heroui/react'

export default function Brands() {

  function getAllBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

 const {data , isLoading , isFetching , refetch} =  useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands,
    select: (res)=> res.data.data,
    gcTime: 3000 ,
    // staleTime:1000 , 
    // refetchInterval:5000,
    // refetchIntervalInBackground: true,
    // refetchOnReconnect:true ,
    // refetchOnWindowFocus: true,
    // retry:3 ,
    // retryDelay:5000


  })

  if (isLoading) {
    return <LoadingScreen/>
  }


  return (
    <>
    <h1 className='text-center text-green-500 text-lg  font-bold'> ALL Brands</h1>
    {/* <Button isLoading = {isFetching} onPress={refetch}>Refetch</Button> */}
    <div className='grid grid-cols-5 gap-3'>
      {
        data?.map((category , index)=>{
          return <div key={index}>
            <img src={category.image} alt="" />
            <h3 className='text-center'>{category.name}</h3>

          </div>

        })
      }
    </div>
    </>
  )
}
