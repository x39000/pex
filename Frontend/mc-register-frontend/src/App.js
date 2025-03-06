import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Members from "./components/Members";
import CreateUser from "./components/CreateUser";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Login</Link>
          {user && <Link to="/profile">My Profile</Link>}
          {user && user.rolle === "admin" && (
            <Link to="/members">All Members</Link>
          )}
          {user && user.rolle === "admin" && (
            <Link to="/create-user">Create User</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/members" element={<Members user={user} />} />
          <Route path="/create-user" element={<CreateUser user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
