import React, { useContext, useState } from 'react'
import {darkLayout, Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik  } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // function clearInputs(){
  //   formik.values.email = "";
  //   formik.values.newPassword = "";
  // }


  const validationSchema = Yup.object(
      {
        email: Yup.string().required('Email is required').email('Invalid email address'),
        newPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      }
    )

    const initialValues = {
      email: "",
      newPassword: "",
    };
  
    async function resetNew(values) {
      try {
        setIsLoading(true)
  
        let { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );
        console.log(data);
        setIsLoading(false)
        localStorage.setItem("token", data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  
    const { handleSubmit, values, handleChange, errors, touched, handleBlur } =
      useFormik({
        initialValues,
        onSubmit :resetNew,
        validationSchema,
      });
    
      return (
        <div>
          <form onSubmit={handleSubmit}>
          <div className="w-11/12 sm:w-2/3 mx-auto grid py-20 gap-4">
    
          <div className=''>
          <Input isInvalid={errors.email && touched.email} errorMessage={errors.email} onChange={handleChange} onBlur={handleBlur} value={values.email}  variant='borderd' label="Email" type="email" name='email' />
          </div>
    
          <div className=''>
          <Input isInvalid={errors.newPassword && touched.newPassword} errorMessage={errors.newPassword} onChange={handleChange} onBlur={handleBlur} value={values.newPassword} variant='borderd' label="New Password" type="password" name='newPassword'/>
          </div>
    
          <Button type='submit' className='' isLoading={isLoading} color="primary">
          Login
        </Button>
          </div>
          </form>
        </div>
      )
    }
    







