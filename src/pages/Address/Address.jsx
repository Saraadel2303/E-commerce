import React, { useState } from 'react'
import {darkLayout, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function Address() {
  const [isLoading, setIsLoading] = useState(false);
  const {cartId} = useParams();
  console.log(cartId)

  const validationSchema = Yup.object(
    {
      details: Yup.string().required('Details is required'),
      phone: Yup.string().required('Phone is required').matches(/^[0-9]{11}$/, 'Phone must be 11 numbers'),
      city: Yup.string().required('City is required')
      
    }
  )


  async function checkOut(){
    setIsLoading(true)
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , {
      shippingAddress : values
    } , {
      headers:{
        token: localStorage.getItem("token")
      } ,
      params:{
        url: "http://localhost:5173"
      }
    })
    setIsLoading(false)
   location.href = data.session.url
  

    }

  const initialValues= {
    details:'6 tahreer street',
    phone:'01021082107',
    city:'dokki',
    
  }

const {handleSubmit , values , handleChange , errors , touched , handleBlur}= useFormik({
 initialValues,
  onSubmit: checkOut,
  // validate
  validationSchema
})

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="w-11/12 sm:w-2/3 mx-auto grid py-20 gap-4">
      <Input isInvalid={errors.details && touched.details} errorMessage={errors.details}  onChange={handleChange} onBlur={handleBlur}  value={values.details} variant='borderd' label="Details" type="text" name='details' />
      <Input isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} onChange={handleChange} onBlur={handleBlur} value={values.phone}  variant='borderd' label="Phone Number" type="tel" name='phone' />
      <Input isInvalid={errors.city && touched.city} errorMessage={errors.city}  onChange={handleChange} onBlur={handleBlur}  value={values.city} variant='borderd' label="City" type="text" name='city' />
    
      <Button type='submit' isLoading={isLoading} color="primary">
      Place Order
    </Button>
      </div>
      </form>
    </div>
  )
}
