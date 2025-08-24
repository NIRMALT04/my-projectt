import React, { useState } from "react";
import axios from "axios";

// Configure axios base URL for backend
const API_BASE_URL = "http://localhost:8000";

function App() {
  const [page, setPage] = useState("role"); // role | login | register | welcome
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear form data
  const clearForm = () => {
    setUsername("");
    setPassword("");
    setError("");
    setSuccess("");
  };

  // Handle registration
  const handleRegister = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_BASE_URL}/register/${role}`, {
        username,
        password
      });
      
      setSuccess(response.data.message);
      setTimeout(() => {
        setPage("login");
        clearForm();
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "Registration failed");
      } else {
        setError("Network error. Please check if backend is running.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/login/${role}`, {
        username,
        password
      });
      
      setSuccess(response.data.message);
      setTimeout(() => {
        setPage("welcome");
        clearForm();
      }, 1000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "Login failed");
      } else {
        setError("Network error. Please check if backend is running.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = () => {
    clearForm();
    setRole("");
    setPage("role");
  };

  // Go back to role selection
  const goBackToRole = () => {
    clearForm();
    setRole("");
    setPage("role");
  };

  // Go to registration page
  const goToRegister = () => {
    clearForm();
    setPage("register");
  };

  // Go to login page
  const goToLogin = () => {
    clearForm();
    setPage("login");
  };

  return (
    <div style={styles.container}>
      {/* Role Selection Page */}
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
            disabled={isLoading}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button 
            style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          
          <p style={styles.linkText}>
            Don't have an account? <span style={styles.link} onClick={goToRegister}>Sign Up</span>
          </p>

          <button
            style={{ ...styles.button, background: "#7f8c8d" }}
            onClick={goBackToRole}
            disabled={isLoading}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* Registration Page */}
      {page === "register" && (
        <div style={styles.card}>
          <h2>Register as {role}</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button 
            style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          
          <p style={styles.linkText}>
            Already have an account? <span style={styles.link} onClick={goToLogin}>Sign In</span>
          </p>

          <button
            style={{ ...styles.button, background: "#7f8c8d" }}
            onClick={goBackToRole}
            disabled={isLoading}
          >
            ⬅ Back
          </button>
        </div>
      )}

      {/* Welcome Page */}
      {page === "welcome" && (
        <div style={styles.card}>
          <h1>Welcome {role === "doctor" ? "Doctor" : "Patient"} 👋</h1>
          <p style={styles.welcomeText}>
            You have successfully logged in to the system!
          </p>
          
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

// Enhanced styles
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
    width: "350px",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "6px",
    background: "#2980b9",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#e74c3c",
    margin: "10px 0",
    fontSize: "14px",
  },
  success: {
    color: "#27ae60",
    margin: "10px 0",
    fontSize: "14px",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#7f8c8d",
  },
  link: {
    color: "#3498db",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  welcomeText: {
    color: "#7f8c8d",
    marginBottom: "20px",
    fontSize: "16px",
  },
};

export default App;
