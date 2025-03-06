import React, { useState } from 'react'
import {darkLayout, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, seterrMsg] = useState("")

  const validationSchema = Yup.object(
    {
      name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
      email: Yup.string().required('Email is required').email('Invalid email address'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone: Yup.string().required('Phone is required').matches(/^[0-9]{11}$/, 'Phone must be 11 numbers'),
    }
  )

  function validate(){
    const errors={}

   if(values.name==""){
    errors.name = "Name is required"
   } else if(values.name.length<3){
    errors.name = "Name must be at least 3 characters"
   } else if(values.name.length>20){
    errors.name = "Name must be at most 20 characters"
   }
   if(values.email==""){
    errors.email = "Email is required"
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address"
   }
   if(values.password==""){
    errors.password = "Password is required"
   }
   if(values.rePassword==""){
    errors.rePassword = "RePassword is required"
   } else if (values.rePassword !== values.password) {
    errors.rePassword = "Passwords must match"
   }

   if(values.phone==""){
    errors.phone = "Phone is required"
   }
   

    return errors
  }

 function onSubmit(){
  setIsLoading(true)
  seterrMsg("")
axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
.then(({data})=>{
  if (data.message =="success"){
    navigate("/login")
  }
}).catch((err)=>{
  seterrMsg(err.response.data.message);
}).finally(()=>{
  setIsLoading(false)
})
 }

  const initialValues= {
    name:'Sara',
    email:'sara@gmail.com',
    password:'Sara@123',
    rePassword:'Sara@123',
    phone:'01021082107',
  }

const {handleSubmit , values , handleChange , errors , touched , handleBlur}= useFormik({
 initialValues,
  onSubmit,
  // validate
  validationSchema
})

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="w-11/12 sm:w-2/3 mx-auto grid md:grid-cols-2 py-20 gap-4">

      <div  className='md:col-span-2'>
      <Input isInvalid={errors.name && touched.name} errorMessage={errors.name}  onChange={handleChange} onBlur={handleBlur}  value={values.name} variant='borderd' label="Name" type="text" name='name' />
      </div>

      <div className='md:col-span-2'>
      <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} onChange={handleChange} onBlur={handleBlur} value={values.email}  variant='borderd' label="Email" type="email" name='email' />
      </div>

      <div className=''>
      <Input isInvalid={errors.password && touched.password} errorMessage={errors.password} onChange={handleChange} onBlur={handleBlur} value={values.password} variant='borderd' label=" Password" type="password" name='password'/>
      </div>
      
      <div  className=''>
      <Input isInvalid={errors.rePassword && touched.rePassword} errorMessage={errors.rePassword} onChange={handleChange} onBlur={handleBlur}  value={values.rePassword} variant='borderd' label="RePassword" type="password" name='rePassword'/>
      </div>
      
      <div className='md:col-span-2'>
      <Input isInvalid={errors.phone && touched.phone} errorMessage={errors.phone} onChange={handleChange} onBlur={handleBlur} value={values.phone}  variant='borderd' label="Phone Number" type="tel" name='phone' />
      </div>

      <Button type='submit' className='md:col-span-2' isLoading={isLoading} color="primary">
      Register
    </Button>
    {errMsg && <p className='text-red-500'>{errMsg}</p>}
      </div>
      </form>
    </div>
  )
}
