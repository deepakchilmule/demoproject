import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NewUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://users-backend-app.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data.reverse());
      });
  }, []);

  const user = JSON.parse(localStorage.getItem("added-user"));
  console.log(user);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <div className=" border mt-12 flex justify-around px-8 py-3 ">
        <div className=" h-screen">
          <h1 className="text-2xl font-bold"> Welcome {user.data.email} </h1>

          <p className="p-2 border mt-4 w-96 text-sm font-semibold">
            {" "}
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."{" "}
          </p>
        </div>

        <div>
          <button
            className="bg-green-600 rounded-full px-16 py-3 mt-2 text-white text-xs font-semibold"
            onClick={logout}
          >
            LOG OUT
          </button>
        </div>

        <div className="overflow-y-auto h-96">
          <h1 className="bg-green-600 text-white font-semibold text-lg p-3">
            {" "}
            Authorized users  
          </h1>

          {users.map((d) => (
            <div className="flex justify-between mt-2 p-1">
              <h1 className="text-sm font-semibold"> {d.email} </h1>

              <div>
              
              <Link className="text-white px-3 rounded-md py-1 bg-blue-400 font-semibold text-xs"to={`/edit/${d._id}`} >EDIT</Link>
                <Link className="text-white px-3 rounded-md py-1 bg-red-500 font-semibold text-xs ml-1" to={`/delete/${d._id}`}> DELETE </Link>
                  
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewUser;
