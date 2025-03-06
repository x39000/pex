import React, { useState } from "react";
import axios from "axios";

function CreateUser({ user }) {
  const [navn, setNavn] = useState("");
  const [email, setEmail] = useState("");
  const [passord, setPassord] = useState("");
  const [rolle, setRolle] = useState("medlem");
  const [adresseId, setAdresseId] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/create-user",
        { navn, email, passord, rolle, adresse_id: adresseId },
        { withCredentials: true }
      );
      alert("User created successfully");
    } catch (error) {
      alert("Error creating user");
    }
  };

  if (!user || user.rolle !== "admin") return <p>Access denied</p>;

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={passord}
          onChange={(e) => setPassord(e.target.value)}
          required
        />
        <select value={rolle} onChange={(e) => setRolle(e.target.value)}>
          <option value="medlem">Member</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="number"
          placeholder="Address ID"
          value={adresseId}
          onChange={(e) => setAdresseId(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
