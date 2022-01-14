import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [empty, setEmpty] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function onSave() {
    if (
      firstname.trim().length === 0 ||
      lastname.trim().length === 0 ||
      birthDay.trim().length === 0 ||
      email.trim().length === 0
    ) {
      setEmpty(true);
      return;
    } else {
      setEmpty(false);
    }

    let result = await fetch(
      `https://users-backend-app.herokuapp.com/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          first_name: firstname,
          last_name: lastname,
          dob: birthDay,
        }),
      }
    );
    result = await result.json();

    navigate("/new");
  }

  return (
    <div className="w-96 ml-96 mt-10 h-auto border shadow-md rounded-md">
      <h1 className="bg-green-600 text-white font-semibold text-lg p-3">
        Edit User{" "}
      </h1>
      <div className="p-4 mt-1">
        <input
          placeholder="email...."
          className="border rounded w-full p-2 text-gray-700 mt-20"
          onChange={(e) => {
            setEmail(e.target.value);
            if (email.trim().length > 0) {
              setEmpty(false);
            }
          }}
        ></input>

        <input
          placeholder="first name"
          className="border rounded w-full p-2 text-gray-700 mt-2"
          onChange={(e) => {
            setFirstname(e.target.value);
            if (firstname.trim().length > 0) {
              setEmpty(false);
            }
          }}
        ></input>

        <input
          placeholder="last name"
          className="border rounded w-full p-2 text-gray-700 mt-2"
          onChange={(e) => {
            setLastname(e.target.value);
            if (lastname.trim().length > 0) {
              setEmpty(false);
            }
          }}
        ></input>

        <input
          placeholder="birthday d/m/y"
          className="border rounded w-full p-2 text-gray-700 mt-2"
          onChange={(e) => {
            setBirthDay(e.target.value);
            if (birthDay.trim().length > 0) {
              setEmpty(false);
            }
          }}
        ></input>

        {empty && (
          <p className="text-red-500 font-semibold text-sm">
            cannot proceed with empty inputs!!
          </p>
        )}
        <br></br>

        <button
          onClick={onSave}
          className="bg-red-500 text-white text-xs font-semibold rounded-md px-6 py-2 mt-2"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export default EditUser;
