import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  async function onSave() {
    let result = await fetch(
      `https://users-backend-app.herokuapp.com/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: user,
          first_name: "deepak",
          last_name: "narayan",
          dob: "10/09/2000",
        }),
      }
    );
    result = await result.json();

    navigate("/new");
  }

  return (
    <div className="w-96 ml-96 mt-40 h-80 border shadow-md rounded-md">
      <h1 className="bg-green-600 text-white font-semibold text-lg p-3">
        Edit User{" "}
      </h1>
      <div className="p-4 mt-8">
        <input
          placeholder="email...."
          className="border rounded w-full p-2 text-gray-700 mt-20"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></input>
        <br></br>

        <button
          onClick={onSave}
          className="bg-red-500 text-white text-xs font-semibold rounded-md px-4 py-1 mt-2"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}

export default EditUser;
