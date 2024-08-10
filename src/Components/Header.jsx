import React, { useEffect, useState } from "react";
import { Logo } from "./Index.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authObj from "../Appwrite/Auth.js";
import { logout } from "../Slice/HomestaySlice.js";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const loginStat = useSelector((state) => state.loginStatus);
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("Login Status ", loginStat);

  const logoutFn = async () => {
    setLoading(true);
    try {
      // delete all the sessions
      const response = await authObj.Logout();
      dispatch(logout());
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  const navItemLeft = [
    {
      name: "Home",
      path: "/",
      status: true,
    },
    {
      name: "Add Post",
      path: "/add-Post",
      status: loginStat,
    },
    {
      name: "My Posts",
      path: userdata ? `/my-post/${userdata.$id}` : "/my-post/undefined",
      status: loginStat,
    },
  ];

  const navItemRight = [
    {
      name: "Sign in",
      path: "/login",
      status: !loginStat,
    },
    {
      name: "Sign up",
      path: "/signup",
      status: !loginStat,
    },
  ];

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <Loader />
        </div>
      )}
      <motion.div
        className="mt-0 w-full px-2 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-400 to-blue-600 h-16 items-center justify-between"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <header className="absolute inset-x-0 top-0 z-50 overflow-hidden">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-2 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Blog By HS</span>
                <Logo />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navItemLeft.map(
                (item, index) =>
                  item.status && (
                    <li
                      className="list-none text-lg font-bold leading-6 text-black"
                      key={index}
                    >
                      <button onClick={() => navigate(item.path)}>
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </div>
            <div className="hidden lg:flex gap-4 lg:flex-1 lg:justify-end">
              {navItemRight.map(
                (item, index) =>
                  item.status && (
                    <li
                      className="list-none text-lg font-bold leading-6 text-black"
                      key={index}
                    >
                      <button onClick={() => navigate(item.path)}>
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {loginStat && (
                <>
                  <li className="list-none text-sm font-semibold leading-6 text-white">
                    <button onClick={logoutFn}>Logout</button>
                  </li>
                </>
              )}
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-52 overflow-y-auto backdrop-blur-sm bg-white/25 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Blog By HS</span>
                  <Logo />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-black rounded-full  hover:bg-white/10"
                  />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navItemLeft.map(
                      (item, index) =>
                        item.status && (
                          <li
                            className="list-none -mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-black hover:bg-white/10"
                            key={index}
                          >
                            <button
                              onClick={() => {
                                navigate(item.path);
                                setMobileMenuOpen(false);
                              }}
                            >
                              {item.name}
                            </button>
                          </li>
                        )
                    )}
                  </div>
                  <div className="py-6">
                    {navItemRight.map(
                      (item, index) =>
                        item.status && (
                          <li
                            className="list-none -mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-black hover:bg-white/10"
                            key={index}
                          >
                            <button
                              onClick={() => {
                                navigate(item.path);
                                setMobileMenuOpen(false);
                              }}
                            >
                              {item.name}
                            </button>
                          </li>
                        )
                    )}
                    {loginStat && (
                      <>
                        <li className="list-none -mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-black hover:bg-white/10">
                          <button onClick={logoutFn}>Logout</button>
                        </li>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      </motion.div>
    </>
    // <header className="w-full h-20 absolute bg-cyan-800 text-black">
    //   <nav className=" overflow-hidden flex flex-wrap justify-between p-2">
    //     <div className="m-2 flex items-center justify-center gap-4 text-xl">
    //       <Link to="/">
    //         <Logo />
    //       </Link>
    //       {navItemLeft.map(
    //         (item, index) =>
    //           item.status && (
    //             <li className="list-none" key={index}>
    //               <button onClick={() => navigate(item.path)}>
    //                 {item.name}
    //               </button>
    //             </li>
    //           )
    //       )}
    //     </div>
    //     <div className="pl-6 flex flex-wrap items-center justify-center gap-4">
    //       <div className="mr-8 flex items-center justify-center gap-4 text-xl">
    //         {navItemRight.map(
    //           (item, index) =>
    //             item.status && (
    //               <li className="list-none" key={index}>
    //                 <button onClick={() => navigate(item.path)}>
    //                   {item.name}
    //                 </button>
    //               </li>
    //             )
    //         )}
    //         {loginStat && (
    //           <>
    //             <li className="list-none">
    //               <button onClick={logoutFn}>Logout</button>
    //             </li>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Header;
