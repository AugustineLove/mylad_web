import { useState } from "react";
import { NavLink } from "react-router";
import AppButton from "../components/button";
import NavBar from "../components/navBar";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <NavBar />
      <section
        className="h-screen flex flex-col justify-center items-center pt-[100px] relative bg-cover bg-center "
        style={{
          backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20241024/pngtree-ai-technology-education-background-with-circuit-board-and-graduation-hat-on-image_16447498.jpg')",
        }}
      >
        {/* Dark overlay for dim effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="bg-white flex flex-col w-[50%] p-12 rounded-lg shadow-md relative z-10">
          <h1 className="font-bold text-3xl mb-4 text-center text-gray-800">AppName</h1>
          <h2 className="text-2xl text-center mb-2 text-gray-700">
            {isSignUp ? "Create an Account" : "Manage with Us!"}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in here." : "Sign up here."}
            </span>
          </p>

          <form className="space-y-4">
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="School Name"
                  className="border p-3 w-full rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="border p-3 w-full rounded"
                />
                <input
                  type="text"
                  placeholder="Office Number"
                  className="border p-3 w-full rounded"
                />
              </>
            )}
            <input
              type="email"
              placeholder="School Email"
              className="border p-3 w-full rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 w-full rounded"
            />

            <div className="flex justify-center mt-6">
              <NavLink to={"/dashboard"}>
                <AppButton name={isSignUp ? "Sign Up" : "Sign In"} />
              </NavLink>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
