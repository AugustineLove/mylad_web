import { useState } from "react";
import { useNavigate } from "react-router";
import AppButton from "../components/button";
import NavBar from "../components/navBar";
import { useSchool } from "../context/schoolContext";
import { baseUrl } from "../constants/helpers";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { updateSchool } = useSchool(); // Use the context function

  // State for form data
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolWebsite: "",
    schoolEmail: "",
    schoolPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignUp
        ? `${baseUrl}schools/add`
        : `${baseUrl}schools/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolName: isSignUp ? formData.schoolName : undefined,
          schoolAddress: isSignUp ? formData.schoolAddress : undefined,
          schoolPhone: isSignUp ? formData.schoolPhone : undefined,
          schoolWebsite: formData.schoolWebsite,
          schoolEmail: formData.schoolEmail,
          schoolPassword: formData.schoolPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("schoolId", data.schoolId);
        localStorage.setItem("schoolName", data.schoolName);
        alert(isSignUp ? "School created successfully!" : "Login successful!");
        updateSchool(data.schoolId);
        isSignUp ? window.location.reload() : null;
        navigate("/dashboard");
        window.location.reload();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <section
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 p-8"
        style={{
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ckAA6QKMknezCq5R4xUp2s-nxA944Ev27A&s')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
          <div className="flex m-auto w-full justify-center items-center mb-5">
          <img 
            src='Asset 2.png'
            className='w-36 h-14 mb-1'
          />
        </div>
          <h2 className="text-2xl text-center text-gray-700 mb-2">
            {isSignUp ? "Create an Account" : "Sign in to Manage!"}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="text-indigo-600 cursor-pointer underline hover:text-indigo-400 transition duration-200"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign in here." : "Sign up here."}
            </span>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="School Name"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
                <input
                  type="text"
                  name="schoolAddress"
                  placeholder="Location"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
                <input
                  type="text"
                  name="schoolPhone"
                  placeholder="Office Number"
                  value={formData.schoolPhone}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
                <input
                  type="text"
                  name="schoolWebsite"
                  placeholder="School Website"
                  value={formData.schoolWebsite}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  required
                />
              </>
            )}

            <input
              type="email"
              name="schoolEmail"
              placeholder="School Email"
              value={formData.schoolEmail}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
            <input
              type="password"
              name="schoolPassword"
              placeholder="Password"
              value={formData.schoolPassword}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />

            <div className="flex justify-center mt-6">
              <button type="submit" className="w-full">
                <AppButton name={isSignUp ? "Sign Up" : "Sign In"} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
