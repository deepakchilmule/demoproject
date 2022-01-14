import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ViewUser() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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

  function goBack() {
    navigate("/new");
  }

  console.log(user);

  return (
    <div className="flex justify-center">
      <div className=" border shadow-md rounded-md h-60 w-96 mt-20">
        <h1 className="bg-green-600 rounded-md text-white font-semibold text-lg px-4 py-2">
          User Details
        </h1>
        {user.map((d) => (
          <div className="mt-7 p-2">
            <h1 className="p-1 text-2xl text-black font-semibold">
              {" "}
              {`${d.first_name} ${d.last_name} `}{" "}
            </h1>
            <p className="p-1 text-lg text-black font-semibold ">
              Email : <span> {d.email} </span>{" "}
            </p>
            <p className="p-1 text-lg text-black font-semibold">
              Birthday : <span> {d.dob} </span>{" "}
            </p>
          </div>
        ))}

        <button
          className="bg-red-500 text-white text-xs font-semibold rounded-md px-8 py-2 ml-2"
          onClick={() => {
            goBack();
          }}
        >
          {" "}
          Press to Go Back
        </button>
      </div>
    </div>
  );
}

export default ViewUser;
