import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("role"); // role | login | welcome
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded credentials
  const users = {
    doctor: { username: "doctor123", password: "docpass" },
    patient: { username: "patient123", password: "patpass" },
  };

  // Login function
  const handleLogin = () => {
    if (
      username === users[role].username &&
      password === users[role].password
    ) {
      setError("");
      setPage("welcome");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  // ✅ Sign Out function (goes back to role selection page)
  const handleSignOut = () => {
    setUsername("");   // clear username
    setPassword("");   // clear password
    setError("");      // clear error
    setRole("");       // clear role
    setPage("role");   // 👈 back to role selection (first page)
  };

  return (
    <div style={styles.container}>
      {/* First Page: Role Selection */}
      {page === "role" && (
        <div style={styles.card}>
          <h2>Select Role</h2>
          <button
            style={styles.button}
            onClick={() => {
              setRole("doctor");
              setPage("login");
            }}
          >
            🩺 I am a Doctor
          </button>
          <button
            style={styles.button}
            onClick={() => {
              setRole("patient");
              setPage("login");
            }}
          >
            👤 I am a Patient
          </button>
        </div>
      )}

      {/* Login Page */}
      {page === "login" && (
        <div style={styles.card}>
          <h2>Login as {role}</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} onClick={handleLogin}>
            Sign In
          </button>
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}>
            Don’t have an account? <b>Sign Up</b>
          </p>

          {/* 🔙 Back button to go back to role selection */}
          <button
            style={{ ...styles.button, background: "#7f8c8d" }}
            onClick={() => {
              setUsername("");
              setPassword("");
              setError("");
              setPage("role");
            }}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* Welcome Page */}
      {page === "welcome" && (
        <div style={styles.card}>
          <h1>Welcome {role === "doctor" ? "Doctor" : "Patient"} 👋</h1>
          
          {/* 🚪 Sign Out button */}
          <button
            style={{ ...styles.button, background: "red" }}
            onClick={handleSignOut}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// Simple styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #6dd5fa, #2980b9)",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "6px",
    background: "#2980b9",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;
