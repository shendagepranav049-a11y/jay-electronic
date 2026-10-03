import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import logo from "../assets/je-logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* Animated background */}
      <div className="login-background" aria-hidden="true">

        <div className="login-grid"></div>

        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>

        <div className="login-orbit login-orbit-one"></div>
        <div className="login-orbit login-orbit-two"></div>
        <div className="login-orbit login-orbit-three"></div>

        <div className="login-brand-logo">
          <img src={logo} alt="" />
        </div>

        <span className="login-particle particle-one"></span>
        <span className="login-particle particle-two"></span>
        <span className="login-particle particle-three"></span>
        <span className="login-particle particle-four"></span>
        <span className="login-particle particle-five"></span>
        <span className="login-particle particle-six"></span>

      </div>


      {/* Login card */}
      <div className="admin-login-wrapper">

        <div className="admin-login-card">

          <div className="login-card-top-line"></div>

          <div className="admin-login-brand">

            <div className="admin-login-logo">
              <img
                src={logo}
                alt="Jay Electronics"
              />
            </div>

            <div>
              <span>JAY ELECTRONICS</span>
              <small>PRIVATE LIMITED</small>
            </div>

          </div>


          <div className="admin-login-header">

            <span className="login-kicker">
              SECURE ACCESS
            </span>

            <h1>
              Admin
              <br />
              <strong>Portal</strong>
            </h1>

            <p>
              Sign in to manage website enquiries
              and business information.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="admin-field">

              <label htmlFor="admin-email">
                Email Address
              </label>

              <div className="admin-input-wrap">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="admin-email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            <div className="admin-field">

              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-input-wrap">

                <span className="input-icon">
                  •••
                </span>

                <input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {error && (
              <div className="admin-login-error">
                <span>!</span>
                {error}
              </div>
            )}


            <button
              className="admin-login-button"
              type="submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Authenticating..."
                  : "Sign In"}
              </span>

              <strong>→</strong>

            </button>

          </form>


          <div className="admin-login-footer">

            <span className="security-dot"></span>

            <p>
              Protected administrative access
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;