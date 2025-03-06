import React, { useContext, useState } from 'react'
import {darkLayout, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../../contexts/authContext';

export default function Login() {

 const {setIsLoggedIn} = useContext(authContext)

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const validationSchema = Yup.object(
      {
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      }
    )



  function validate(){
    const errors={}
   if(values.email==""){
    errors.email = "Email is required"
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address"
   }
   if(values.password==""){
    errors.password = "Password is required"
   }
   
    return errors
  }

function onSubmit(){
  setIsLoading(true)
 axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
 .then(({data})=>{

  if (data.message =="success"){
    localStorage.setItem("token" , data.token)
    setIsLoggedIn(true);
    navigate("/")
  }
}).catch((err)=>{
  console.error(err.response.data.message);
}).finally(()=>{
  setIsLoading(false)
})

  }

  const initialValues= {
    email:'',
    password:'',
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
      <div className="w-11/12 sm:w-2/3 mx-auto grid py-20 gap-4">

      <div className=''>
      <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} onChange={handleChange} onBlur={handleBlur} value={values.email}  variant='borderd' label="Email" type="email" name='email' />
      </div>

      <div className=''>
      <Input isInvalid={errors.password && touched.password} errorMessage={errors.password} onChange={handleChange} onBlur={handleBlur} value={values.password} variant='borderd' label=" Password" type="password" name='password'/>
      </div>

      <Button type='submit' className='' isLoading={isLoading} color="primary">
      Login
    </Button>

   <Link to={"/ForgetPassword"} className='text-gray-400 font-semibold text-small md:text-xl' >Forget Password ?</Link>
      </div>
      </form>
    </div>
  )
}
