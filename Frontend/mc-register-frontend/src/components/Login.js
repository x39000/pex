import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [navn, setNavn] = useState("");
  const [passord, setPassord] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/login", { navn, passord });
      const response = await axios.get("http://localhost:3001/api/me", {
        withCredentials: true,
      });
      setUser(response.data);
      navigate("/profile");
    } catch (error) {
      alert("Ugyldig innlogging");
    }
  };

  return (
    <div className="login-container">
      <h2>Logg inn</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Navn"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passord"
          value={passord}
          onChange={(e) => setPassord(e.target.value)}
          required
        />
        <button type="submit">Logg inn</button>
      </form>
    </div>
  );
}

export default Login;
