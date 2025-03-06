import { Button, Input } from '@heroui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function VerifyCode() {

    const [isverifyLoading, setIsVerifyLoading] = useState(false);
  const navigate = useNavigate();

  function clearInputs(){
    formik.values.resetCode = "";
  }
   

    function onSubmit(values){
        setIsVerifyLoading(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values)
       .then(({data})=>{
      
        if (data.status=="Success"){
          localStorage.setItem("userResetEmail" , values.email)
          setIsVerifyLoading(true);
          navigate("/ResetPassword")
        }
      }).catch(()=>{
        clearInputs();
      }).finally(()=>{
       setIsVerifyLoading(false)
      })
      console.log(values)
    }

    const {values , handleSubmit , handleChange} = useFormik({
        initialValues: {
          resetCode: "" ,
        }, 
        onSubmit,
    })


  return (
    <div className="w-11/12 sm:w-2/3 mx-auto">
        <form onSubmit={handleSubmit}>
        <Input value={values.resetCode} onChange={handleChange}  variant='borderd' label="Enter Reset Code" type="text" name='resetCode' />
        <Button isLoading={isverifyLoading} type='submit' className='mt-4 text-lg font-semibold'  color="primary" variant="light">
       Verify
      </Button>
        </form>
        </div>
  )
}
