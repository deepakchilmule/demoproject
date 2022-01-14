import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DeleteUser() {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://users-backend-app.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUser(
          data.data.filter((item) => {
            return item._id === id;
          })
        );
      });
  }, []);

  console.log(user);

  async function onDelete(id) {
    await axios.delete(`https://users-backend-app.herokuapp.com/user/${id}`);
    navigate("/new");

    setDeleteMessage("User Deleted !!");
  }

  return (
    <div className="w-96 ml-96 mt-40 h-80 border shadow-md rounded-md">
      <h1 className="bg-green-600 text-white font-semibold text-lg p-3">
        {" "}
        {user.map(
          (d) => ` Do you want to delete ${d.first_name} ${d.last_name} ??`
        )}{" "}
      </h1>

      <div className="p-2">
        <h1 className="text-xl font-semibold"> {user.map((d) => d.email)} </h1>

        <button
          className="bg-red-500 text-white text-xs font-semibold rounded-md px-8  py-1 mt-8"
          onClick={() => {
            onDelete(id);
          }}
        >
          <h1 className="text-xs font-semibold">YES</h1>
        </button>
      </div>
      <h1> {deleteMessage?.deleteMessage} </h1>
    </div>
  );
}

export default DeleteUser;
