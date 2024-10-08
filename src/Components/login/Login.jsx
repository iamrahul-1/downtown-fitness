import React, { useState, useEffect } from "react";
import "../login/login.css";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`sign in success with ${user.email}`);
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorCode, errorMsg);
        alert("ma chud gayi");
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        console.log("logged in");
        navigate("/");
      } else {
        console.log("not logged in");
      }
    });
  }, [navigate]);

  return (
    <div className="main">
      <div className="wrapper">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="remember-forgot">
            {/* <label>
            <input type="checkbox" />
            Remeber me
          </label> */}
            <Link to={`/register`}>Forgot password?</Link>
          </div>
          <button type="submit" className="btn" onClick={onSubmit}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?<Link to={`/register`}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
