import React, { useState, useEffect } from "react";
import axios from "axios";

function Members({ user }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/members", { withCredentials: true })
      .then((response) => setMembers(response.data))
      .catch((error) => alert("Access Denied"));
  }, []);

  if (!user || user.rolle !== "admin") return <p>Access denied</p>;

  return (
    <div className="members-container">
      <h2>All Members</h2>
      {members.map((member) => (
        <div className="member-card" key={member.medlem_id}>
          <h3>{member.navn}</h3>
          <p>Email: {member.email}</p>
          <p>
            MC: {member.mc_type || "Ingen MC registrert"} (
            {member.produsent || "N/A"})
          </p>
        </div>
      ))}
    </div>
  );
}

export default Members;
