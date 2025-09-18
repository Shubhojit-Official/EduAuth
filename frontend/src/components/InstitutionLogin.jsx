import React, { useState } from "react";
import { MoveLeft } from 'lucide-react';

const InstitutionLogin = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className=" h-100vh flex items-center justify-center  p-4 absolute inset-0  w-full bg-white bg-[radial-gradient(#2564eb46_2px,transparent_2px)] [background-size:20px_20px] xl:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] flex-col ">
      <h1 className="text-5xl font-semibold text-center text-blue-600 font-ubuntu mb-8">
        EduAuth
      </h1>

      <div className="backdrop-blur-sm backdrop-grayscale rounded-xl shadow-xl border border-black/30 w-full max-w-xl  p-8 space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl  text-center text-gray-900 font-sans">
            {isSignup
              ? "Institution Signup"
              : "Log in to your Institution account"}
          </h2>
          <h3 className="text-md  text-center text-gray-500 ">
            {isSignup
              ? "Please fill up your credentials."
              : "Welcome Back! Please enter your details."}
          </h3>
        </div>
        <form className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Institution Name
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-school-icon lucide-school absolute left-3 text-gray-400 pointer-events-none"
                  >
                    <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                    <path d="M18 5v16" />
                    <path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" />
                    <path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" />
                    <path d="M6 5v16" />
                    <circle cx="12" cy="9" r="2" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter institution name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone-icon lucide-phone absolute left-3 text-gray-400 pointer-events-none"
                  >
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Enter Address
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin-icon lucide-map-pin absolute left-3 text-gray-400 pointer-events-none"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Email
            </label>
            <div class="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-mail absolute left-3 text-gray-400 pointer-events-none"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                placeholder="email@example.com"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {!isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lock-icon lucide-lock absolute left-3 text-gray-400 pointer-events-none"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-600 hover:underline"
              >
                Signup here
              </button>
            </>
          )}
        </div>

      </div>
      <button className=" m-5 sm:m-10 flex gap-3 items-center text-gray-500 text-xl">
        <MoveLeft />Back to Home
      </button>

    </div>
  );
};

export default InstitutionLogin;
