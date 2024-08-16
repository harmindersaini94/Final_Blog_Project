import React, { useEffect, useState } from "react";
import { Input, Button, Logo } from "./Index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authObj from "../Appwrite/Auth.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slice/HomestaySlice.js";
import Loader from "./Loader";
import signin from "../assets/signin.png";
import { motion } from "framer-motion";

const Login = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const selector = useSelector((state) => state.loginStatus);

  const loginData = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authObj.LoginAccount(data);
      if (session) {
        // means success, use the get method to get user data and save in app atore
        const userdata = await authObj.GetCurrentLoggedInUser();
        if (userdata) {
          dispatch(login({ userdata }));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      reset();
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      <div className="relative overflow-hidden top-24 lg:top-48 flex flex-col lg:flex-row w-full flex-wrap content-center items-center justify-center gap-8 p-4">
        <motion.div
          className="overflow-hidden"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img
            className="w-[300px] lg:w-[470px]  rounded-3xl object-contain "
            src={signin}
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
              <h1 className="text-cyan-600 font-bold text-4xl">Sign In</h1>
              <h3 className="mt-6 p-6 text-gray-400 text-xl font-semibold border-b-2">
                Don&apos;t have any account?&nbsp;
                <Link
                  to="/signup"
                  className="font-medium text-primary  hover:font-extrabold"
                >
                  <span className="text-cyan-600 "> Sign Up</span>
                </Link>
              </h3>
            </div>
          </div>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(loginData)} className="mt-4">
            <div className="space-y-9 m-2">
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

              <Button type="submit" children="Sign In" />
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
