import React from "react";

function Profile({ user }) {
  if (!user) return <p>Not logged in</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.navn}!</h2>
      <p>Adresse: {user.adresse}</p>
      <p>Postnummer: {user.postnummer}</p>
      <h3>Motorsykkel Info</h3>
      <p>
        Registreringsnummer: {user.registreringsnummer || "Ingen MC registrert"}
      </p>
      <p>MC Type: {user.mc_type || "N/A"}</p>
      <p>Produsent: {user.produsent || "N/A"}</p>
    </div>
  );
}

export default Profile;
