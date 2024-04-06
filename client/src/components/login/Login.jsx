import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "loginStart" });
      const res = await axios.post("/api/auth/signin", credentials);
      dispatch({ type: "loginSuccess", payload: res.data });
      console.log(res.data);
      navigate(from, { replace: true });
    } catch (err) {
      dispatch({ type: "loginFailure", payload: err.response.data });
      console.log(err.response.data);
    }
  };

  return (
    <div
      className="px-4 py-5 mx-auto my-auto"
      style={{ width: "32rem", background: "white" }}
    >
      <div className="mb-4 text-md-center d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <h3 className="fw-bold d-flex align-items-center gap-2">
          <Icon icon="codicon:account" /> <span>Log-in</span>
        </h3>
        <span>
          {" "}
          Dont have an account?{" "}
          <Link to="/sign-up" className="text-decoration-none">
            <span className="primary-color fw-bold ">Sign Up</span>
          </Link>{" "}
        </span>
      </div>
      {/* login form */}
      <form className="d-flex flex-column gap-2">
        <label>
          Email address <b className="text-danger">*</b>{" "}
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" py-3 px-2 rounded border"
          onChange={handleChange}
        />
        <label>
          Password <b className="text-danger">*</b>{" "}
        </label>
        <input
          type="password"
          name="password"
          placeholder="New password"
          className="px-2 py-3 rounded border"
          onChange={handleChange}
        />
        <button
          type="button"
          className="p-3 rounded"
          style={{ backgroundColor: "#376679", color: "white" }}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
}
