  // Import paired styles
  import '../styles/components/AuthModal.css';
  import { useEffect, useState } from "react";
  import {
    signInWithGoogle,
    signInWithGithub,
    signUpWithEmail,
    signInWithEmail,
  } from "../config/firebase";
  import { useNavigate } from "react-router-dom";
  import { FaGithub, FaGoogle, FaTimes } from "react-icons/fa";
  import "../styles/components/AuthModal.css";
  import { sendPasswordResetEmail } from "firebase/auth";
  import { auth } from "../config/firebase"; // make sure you export `auth` from firebase.js


  const ANIM_MS = 800; // open/close duration
  const SWITCH_MS = 500; // login <-> signup transition duration

  export default function AuthModal({ isOpen, type, onClose, onSuccess }) {
    const [localType, setLocalType] = useState(type);
    const [show, setShow] = useState(false);
    const [closing, setClosing] = useState(false);
    const [switching, setSwitching] = useState(false); // controls login/signup transition
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    // Open/close logic
    useEffect(() => {
      if (isOpen) {
        setLocalType(type);
        setShow(true);
        setClosing(false);
      } else if (show) {
        setClosing(true);
        const t = setTimeout(() => {
          setShow(false);
          setClosing(false);
          setError("");
        }, ANIM_MS);
        return () => clearTimeout(t);
      }
    }, [isOpen, type, show]);

    if (!show && !closing) return null;

    const handleClose = () => {
      setClosing(true);
      const t = setTimeout(() => {
        setShow(false);
        setClosing(false);
        setError("");
        onClose?.();
      }, ANIM_MS);
      return () => clearTimeout(t);
    };

    // Switch between login/signup smoothly
    const handleSwitchType = (newType) => {
      setSwitching(true);
      setTimeout(() => {
        setLocalType(newType);
        setSwitching(false);
      }, SWITCH_MS / 2); // halfway through fade-out, change type
    };

    // Email Auth
    const handleEmailAuth = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");
      const confirmPassword = formData.get("confirmPassword");

      if (localType === "signup" && password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }


      try {
        let cred;
        if (localType === "signup") {
          cred = await signUpWithEmail(email, password, name);
        } else {
          cred = await signInWithEmail(email, password);
        }
        onSuccess?.(cred.user);
        handleClose();
        navigate("/dashboard"); 
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const handleGoogleSignIn = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await signInWithGoogle();
        onSuccess?.(result.user);
        handleClose();
        navigate("/dashboard"); 
      } catch (err) {
        setError(err.message || "Google sign-in failed.");
      } finally {
        setLoading(false);
      }
    };

    const handleGithubSignIn = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await signInWithGithub();
        onSuccess?.(result.user);
        handleClose();
        navigate("/dashboard"); 
      } catch (err) {
        setError(err.message || "GitHub sign-in failed.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div
        className={`authModal__overlay ${isOpen && !closing ? "show" : ""} ${
          closing ? "closing" : ""
        }`}
        onClick={handleClose}
      >
        <div
          className={`authModal__content ${isOpen && !closing ? "show" : ""} ${
            closing ? "closing" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="authModal__close" onClick={handleClose}>
            <FaTimes size={18} />
          </button>

          <div className={`authModal__inner ${switching ? "switching" : ""}`}>
            <h2 className="authModal__title">
              {localType === "signup" ? "Create Your Account" : "Welcome Back"}
            </h2>
            <p className="authModal__subtitle">
              {localType === "signup"
                ? "Join Skyinten and start your journey."
                : "Log in to continue learning."}
            </p>

            {error && <div className="authModal__error">{error}</div>}

            <form className="authModal__form" onSubmit={handleEmailAuth}>
              {localType === "signup" && (
                <div className="authModal__field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              )}
              <div className="authModal__field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="authModal__field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete={
                    localType === "signup" ? "new-password" : "current-password"
                  }
                  required

                />

                {localType === "login" && (
                    <div className="authModal__forgot">
                      <button
                        type="button"
                        className="authModal__link"
                        onClick={async () => {
                          const email = document.getElementById("email")?.value;
                          if (!email) {
                            setError("Please enter your email first.");
                            return;
                          }
                          try {
                            await sendPasswordResetEmail(auth, email);
                            setError("📩 Password reset email sent. Check your inbox.");
                          } catch (err) {
                            setError(err.message || "Failed to send reset email.");
                          }
                        }}
                      >
                        Forgot your password?
                      </button>
                    </div>
       )}

                {localType === "signup" && (
                <div className="authModal__field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                  />
                </div>
)}

              </div>
              <button
                className="authModal__submit"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : localType === "signup"
                  ? "Sign Up"
                  : "Log In"}
              </button>
            </form>

            <div className="authModal__divider">
              <span>OR</span>
            </div>

            <div className="authModal__social">
              <button
                className="authModal__socialBtn google"
                onClick={handleGoogleSignIn}
                disabled={loading}
                type="button"
              >
                <FaGoogle /> Continue with Google
              </button>
              <button
                className="authModal__socialBtn github"
                onClick={handleGithubSignIn}
                disabled={loading}
                type="button"
              >
                <FaGithub /> Continue with GitHub
              </button>
            </div>

            <p className="authModal__switch">
              {localType === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="authModal__link"
                    onClick={() => handleSwitchType("login")}
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="authModal__link"
                    onClick={() => handleSwitchType("signup")}
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
