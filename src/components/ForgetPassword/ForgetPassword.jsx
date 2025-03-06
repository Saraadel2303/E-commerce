import { Button, Input } from '@heroui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    const [isForgetLoading, setIsForgetLoading] = useState(false);
  const navigate = useNavigate();

  function clearInputs(){
    formik.values.email = "";
  }
   

    function onSubmit(values){
        setIsForgetLoading(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values)
       .then(({data})=>{
      
        if (data.statusMsg =="success"){
          localStorage.setItem("userResetEmail" , values.email)
          setIsForgetLoading(true);
          navigate("/VerifyCode")
        }
      }).catch(()=>{
        clearInputs();
      }).finally(()=>{
        setIsForgetLoading(false)
      })
      console.log(values)
    }

    const {values , handleSubmit , handleChange} = useFormik({
        initialValues: {
            email: "" ,
        }, 
        onSubmit,
    })


  return (
    <div className="w-11/12 sm:w-2/3 mx-auto">
        <h1 className='text-center text-xl font-bold text-gray-700 mb-5'>please enter your Email</h1>
        <form onSubmit={handleSubmit}>
        <Input value={values.email} onChange={handleChange}  variant='borderd' label="Email" type="email" name='email' />
        <Button isLoading={isForgetLoading} type='submit' className='mt-4 text-lg font-semibold' color="primary" variant="light">
       Verify
      </Button>
        </form>
        </div>
  )
}
