import React from "react";

function Welcome({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.username}!</h1>
      <h2>You are logged in as: {user.role}</h2>
    </div>
  );
}

export default Welcome;