import React, { useState } from 'react'
import { Input, Button, Logo } from "./Index.js";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom'
import authObj from '../Appwrite/Auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Slice/HomestaySlice.js';

const Signup = () => {

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const signInData = async (data) => {
    console.log(data);
    setError("")
    try {
      const user = await authObj.CreateAccount(data);
      if(user){
        // Login the user as well
        // const userdata = await authObj.GetCurrentLoggedInUser();
        // if(userdata){
        //   // send the data to Store
        //   dispatch(login(userdata))
        //   navigate("/")
        // }
        console.log("User Data From Appwrite");
        
        // dispatch(login(user))
        navigate("/login")
      }
    } catch (error) {
      setError("Error Occured " , error.message)
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-50 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%"></Logo>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-right">
          Sign Up for an account
        </h2>
        <p className="mx-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signInData)} className="mt-8">
          <div className="space-y-5">
          <Input
              label="Full Name: "
              placeholder="Enter Full Name"
              className=""
              type="text"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              placeholder="Enter Email"
              className=""
              type="email"
              {...register("email", {
                required: true,
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter Password"
              className=""
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" children="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup