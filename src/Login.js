import React, { useState } from "react";

function Login({ setUser }) {
  const [role, setRole] = useState("patient");
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple check for demo purposes
    if (username && password) {
      setUser({ role, username });
    } else {
      alert("Please enter credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

      {/* Role selector */}
      <label>
        Select Role:{" "}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </label>

      {/* Login/Signup form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>

      {/* Toggle button */}
      <p style={{ marginTop: "10px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Sign In" : "Sign Up"}
          <button onClick={() => onBack()}>⬅ Back</button>

        </button>
      </p>
    </div>
  );
}

export default Login;
