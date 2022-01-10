import React, { useEffect } from "react";

import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";
import AddedUser from "./components/AddedUser";
import DeleteUser from "./components/DeleteUser";
import EditUser from "./components/EditUser";
import Home from "./components/Home";
import NewUser from "./components/NewUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
        </AppRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
