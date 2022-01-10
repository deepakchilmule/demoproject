import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [message, setMessage] = useState("");

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const navigate = useNavigate();

  async function signUp() {
    if (signUpEmail.trim().length === 0) {
      setInvalid(true);
      return;
    }

    let result = await fetch("https://users-backend-app.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        first_name: "deepak",
        last_name: "narayan",
        dob: "10/09/2000",
      }),
    });
    result = await result.json();
    console.log(result);
    setMessage(result);
    setSignUpEmail("");
    setSignUpPassword("");
    localStorage.setItem("added-user", JSON.stringify(result));
  }

  async function loginUser() {
    if (logInEmail.trim().length === 0 || logInPassword.trim().length === 0) {
      setInputError(true);
      return;
    }

    let result = await fetch("https://users-backend-app.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: logInEmail,
      }),
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("added-user", JSON.stringify(result));

    navigate("/new");
  }

  return (
    <div className=" ">
      <div className="flex justify-center p-10 h-1/2 px-10 border">
        <div className="bg-gray-600 h-96 p-5 w-1/2">
          <div className="flex justify-center  p-4 mt-6">
            <h1 className="text-2xl text-white font-semibold">Welcome</h1>
          </div>

          <p className="p-2  mt-4 text-white text-sm font-semibold">
            {" "}
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."{" "}
          </p>

          <button className="px-5 py-2 bg-green-600 text-white font-bold text-xs">
            REGISTER HERE
          </button>
        </div>

        <div className="border p-4 h-96 shadow-md rounded-md ">
          <div className="flex justify-center">
            <h1 className=" text-green-600 text-xl font-bold p-3 rounded-md p-4">
              Create Account
            </h1>
          </div>

          <input
            className=" border rounded w-full p-2 text-gray-700 mt-2"
            type="text"
            value={signUpEmail}
            placeholder="email"
            onChange={(event) => {
              setSignUpEmail(event.target.value);
            }}
          ></input>

          <input
            className=" border rounded w-full p-2  text-gray-700 mt-2"
            type="password"
            value={signUpPassword}
            placeholder="password"
            onChange={(event) => {
              setInvalid(true);
              setSignUpPassword(event.target.value);
            }}
          ></input>
          <br></br>

          {invalid && (
            <h1 className="text-red-500 font-semibold text-sm">
              inputs must be filled!!
            </h1>
          )}

          <div className="flex justify-center">
            <button
              className="bg-green-600 rounded-full px-10 py-3 mt-8 text-white text-xs font-semibold"
              onClick={signUp}
            >
              SIGN UP
            </button>
          </div>

          <h1 className="text-green-900 text-xl font-semibold">
            {" "}
            {message?.message}{" "}
          </h1>
        </div>
      </div>

      <div className=" p-4 h-96 shadow-md rounded-md">
        <div className="flex  justify-center">
          <h1 className="text-green-600 text-xl font-bold p-3 rounded-md p-4">
            Already have an Account ?
          </h1>

          <div className="w-96">
            <input
              className="border rounded w-full p-2  text-gray-700 mt-2"
              placeholder="email...."
              onChange={(event) => {
                setLogInEmail(event.target.value);
              }}
            ></input>

            <input
              className="border rounded w-full p-2  text-gray-700 mt-2"
              type="password"
              placeholder="password...."
              onChange={(event) => {
                setLogInPassword(event.target.value);
              }}
            ></input>
            <br></br>

            {inputError && (
              <h1 className="text-red-500 font-semibold text-sm">
                inputs must be filled!!
              </h1>
            )}

            <div className="flex justify-center">
              <button
                className="bg-green-600 rounded-full px-14 py-3 mt-8 text-white text-xs font-semibold"
                onClick={loginUser}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
