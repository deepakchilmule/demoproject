import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const [invalid, setInvalid] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [message, setMessage] = useState("");

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

  const navigate = useNavigate();

  async function signUp() {
    if (
      signUpEmail.trim().length === 0 ||
      signUpPassword.trim().length === 0 ||
      signUpFirstName.trim().length === 0 ||
      signUpLastName.trim().length === 0 ||
      birthday.trim().length === 0
    ) {
      setInvalid(true);
      return;
    } else{
      setInvalid(false);
    } 

    let result = await fetch("https://users-backend-app.herokuapp.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        first_name: signUpFirstName,
        last_name: signUpLastName,
        dob: birthday,
      }),
    });
    result = await result.json();
    console.log(result);
    setMessage(result);
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpFirstName("");
    setSignUpLastName("");
    setBirthday("");
    localStorage.setItem("added-user", JSON.stringify(result));
  }

  async function loginUser() {
    if (logInEmail.trim().length === 0 || logInPassword.trim().length === 0) {
      setInputError(true);
      return;
    }  else{
      setInputError(false);
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

        <div className="border p-3 h-auto shadow-md rounded-md ">
          <div className="flex justify-center">
            <h1 className=" text-green-600 text-xl font-bold p-3 rounded-md p-4">
              Create Account
            </h1>
          </div>

          <input
            className=" border rounded w-full p-2 text-gray-700 mt-2"
            type="text"
            value={signUpFirstName}
            placeholder="first name"
            onChange={(event) => {
              setSignUpFirstName(event.target.value);
              if( signUpFirstName.trim().length>0){
                setInvalid(false);
              }
            }}
          ></input>

          <input
            className=" border rounded w-full p-2 text-gray-700 mt-2"
            type="text"
            value={signUpLastName}
            placeholder="last name"
            onChange={(event) => {
              setSignUpLastName(event.target.value);
              if( signUpLastName.trim().length>0){
                setInvalid(false);
              }
            }}
          ></input>

          <input
            className=" border rounded w-full p-2 text-gray-700 mt-2"
            type="text"
            value={signUpEmail}
            placeholder="email"
            onChange={(event) => {
              setSignUpEmail(event.target.value);
              if( signUpEmail.trim().length>0){
                setInvalid(false);
              }
            }}
          ></input>

          <input
            className=" border rounded w-full p-2  text-gray-700 mt-2"
            type="password"
            value={signUpPassword}
            placeholder="password"
            onChange={(event) => {
              setSignUpPassword(event.target.value);
              if( signUpPassword.trim().length>0){
                setInvalid(false);
              }
            }}
          ></input>

          <input
            className=" border rounded w-full p-2 text-gray-700 mt-2"
            type=""
            value={birthday}
            placeholder="birthday  d/m/y"
            onChange={(event) => {
              setBirthday(event.target.value);
              if( birthday.trim().length>0){
                setInvalid(false);
              }
            }}
          ></input>

          <br></br>

          {invalid && (
            <span className="text-red-500 font-semibold text-sm">
              inputs must be filled!!
            </span>
          )}

          <div className="flex justify-center">
            <button
              className="bg-green-600 rounded-full px-12 py-3 mt-2 text-white text-xs font-semibold"
              onClick={() => {
                signUp();
              }}
            >
              SIGN UP
            </button>
          </div>

          <h1 className="text-black text-xl font-bold">
            
            {message?.message } 
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
                if( logInEmail.trim().length>0){
                  setInputError(false);
                }
              }}
            ></input>

            <input
              className="border rounded w-full p-2  text-gray-700 mt-2"
              type="password"
              placeholder="password...."
              onChange={(event) => {
                setLogInPassword(event.target.value);
                if( logInPassword.trim().length>0){
                  setInputError(false);
                }
              }}
            ></input>
            <br></br>

            {inputError && (
              <span className="text-red-500 font-semibold text-sm">
                inputs must be filled!!
              </span>
            )}

            <div className="flex justify-center">
              <button
                className="bg-green-600 rounded-full px-14 py-3 mt-8 text-white text-xs font-semibold"
                onClick={loginUser}
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
