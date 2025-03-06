import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import Product from '../../components/Product/Product'
export default function Home(){

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    gelAllProducts()
  },[])
  
  async function gelAllProducts() {
    setIsLoading(true)
    const {data} = await axios.get ("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data)
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen/>
    
  }
  
  
  
    return (
      < div  className='grid grid-cols-5 gap-4'>
        {
          products.map((product , index)=>{

            return <Product product={product} key={index}/>

          })
        }
      </div>
      )
}
