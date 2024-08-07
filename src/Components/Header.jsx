import React, { useEffect } from "react";
import { Logo } from "./Index.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authObj from "../Appwrite/Auth.js";
import { logout } from "../Slice/HomestaySlice.js";

const Header = () => {
  const navigate = useNavigate();
  const loginStat = useSelector((state) => state.loginStatus);
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();

  console.log("Login Status ", loginStat);

  const logoutFn = async () => {
    console.log("here");
    try {
      // delete all the sessions
      const response = await authObj.Logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {}
  };

  const navItemLeft = [
    {
      name: "Home",
      path: "/",
      status: true,
    },
    // {
    //   name: "All Posts",
    //   path: "/all-posts",
    //   status: true,
    // },
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
    // {
    //   name: "View Post",
    //   path: "/viewpost",
    //   status: true,
    // }
  ];

  const navItemRight = [
    {
      name: "Login",
      path: "/login",
      status: !loginStat,
    },
    {
      name: "Signup",
      path: "/signup",
      status: !loginStat,
    },
  ];

  return (
    <header className="py-2">
      <nav className="overflow-hidden flex flex-wrap justify-between p-2">
        <div className="m-2 flex items-center justify-center gap-4 text-xl">
          <Link to="/">
            <Logo />
          </Link>
          {navItemLeft.map(
            (item, index) =>
              item.status && (
                <li className="list-none" key={index}>
                  <button onClick={() => navigate(item.path)}>
                    {item.name}
                  </button>
                </li>
              )
          )}
        </div>
        <div className="pl-6 flex flex-wrap items-center justify-center gap-4">
          <div className="mr-8 flex items-center justify-center gap-4 text-xl">
            {/* {navItemRight.map((item, index) => (
              <li className="list-none"  key={index}>
                  <button
                  onClick={() => navigate(item.path)}
                  >
                  {item.name}  
                  </button>
              </li>
        ))} */}
            {/* {!loginStat && (
              <>
                <li className="list-none">
                  <button onClick={() => navigate("/login")}>Login</button>
                </li>

                <li className="list-none">
                  <button onClick={() => navigate("/signup")}>Sign Up</button>
                </li>
              </>
            )} */}

            {navItemRight.map(
              (item, index) =>
                item.status && (
                  <li className="list-none" key={index}>
                    <button onClick={() => navigate(item.path)}>
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {loginStat && (
              <>
                <li className="list-none">
                  <button onClick={logoutFn}>Logout</button>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
