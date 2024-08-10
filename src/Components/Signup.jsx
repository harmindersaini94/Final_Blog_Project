import React, { useState } from "react";
import { Input, Button, Logo } from "./Index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authObj from "../Appwrite/Auth.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Slice/HomestaySlice.js";
import Loader from "./Loader";
import signup from "../assets/signup.png";
import { motion } from "framer-motion";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signInData = async (data) => {
    setLoading(true);
    setError("");
    try {
      const user = await authObj.CreateAccount(data);
      if (user) {
        // Login the user as well
        // const userdata = await authObj.GetCurrentLoggedInUser();
        // if(userdata){
        //   // send the data to Store
        //   dispatch(login(userdata))
        //   navigate("/")
        // }
        setLoading(false);

        // dispatch(login(user))
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      <div className="relative overflow-hidden top-16 lg:top-32 flex flex-col lg:flex-row w-full flex-wrap content-center items-center justify-center gap-8 p-4">
        <motion.div
          className="overflow-hidden"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img
            className="w-[300px] lg:w-[560px]  rounded-3xl object-contain "
            // src="https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=600"
            // src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg?ga=GA1.1.1631588099.1721891347&semt=ais_hybrid"
            src={signup}
          />
        </motion.div>
        <motion.div
          className="bg-transparent p-6 border-b-4 border-t-4 rounded-3xl border-cyan-600 "
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="leading-relaxed tracking-wide">
            <div className="text-center">
              <h1 className="text-cyan-600 font-bold text-4xl">Sign Up</h1>
              <h3 className="mt-6 p-6 text-gray-400 text-xl font-semibold border-b-2">
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200 hover:font-extrabold"
                >
                  <span className="text-cyan-600"> Sign In</span>
                </Link>
              </h3>
            </div>
          </div>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(signInData)} className="mt-4">
            <div className="space-y-9 m-2">
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
        </motion.div>
      </div>
    </>
    // <div className="flex items-center justify-center">
    //   <div
    //     className={`mx-auto w-full max-w-lg bg-gray-50 rounded-xl p-10 border border-black/10`}
    //   >
    //     <div className="mb-2 flex justify-center">
    //       <span className="inline-block w-full max-w-[100px]">
    //         <Logo width="100%"></Logo>
    //       </span>
    //     </div>
    //     <h2 className="text-center text-2xl font-bold leading-right">
    //       Sign Up for an account
    //     </h2>
    //     <p className="mx-2 text-center text-base text-black/60">
    //       Already have an account?&nbsp;
    //       <Link
    //         to="/login"
    //         className="font-medium text-primary transition-all duration-200 hover:underline"
    //       >
    //         Log In
    //       </Link>
    //     </p>

    //     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    //     <form onSubmit={handleSubmit(signInData)} className="mt-4">
    //       <div className="space-y-9 m-2">
    //       <Input
    //           label="Full Name: "
    //           placeholder="Enter Full Name"
    //           className=""
    //           type="text"
    //           {...register("name", {
    //             required: true,
    //           })}
    //         />

    //         <Input
    //           label="Email: "
    //           placeholder="Enter Email"
    //           className=""
    //           type="email"
    //           {...register("email", {
    //             required: true,
    //           })}
    //         />

    //         <Input
    //           label="Password: "
    //           placeholder="Enter Password"
    //           className=""
    //           type="password"
    //           {...register("password", {
    //             required: true,
    //           })}
    //         />

    //         <Button type="submit" children="Sign Up" />
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Signup;
