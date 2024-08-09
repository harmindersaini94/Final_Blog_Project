import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components/Index";
import { useEffect } from "react";
import authObj from "./Appwrite/Auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./Slice/HomestaySlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authObj.GetCurrentLoggedInUser().then((userdata) => {
      if (userdata) dispatch(login({ userdata }));
      else dispatch(logout());
    });
  }, []);

  return (
    <>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div> */}

      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 overflow-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div> */}

<div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 overflow-hidden">
  <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] sm:h-[400px] sm:w-[400px] md:h-[300px] md:w-[300px] lg:h-[200px] lg:w-[200px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
  <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] sm:h-[400px] sm:w-[400px] md:h-[300px] md:w-[300px] lg:h-[200px] lg:w-[200px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
</div>

      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
