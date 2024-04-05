import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    firstname: undefined,
    lastname: undefined,
    phonenumber: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "loginStart" });
      const res = await axios.post("/api/auth/signup", credentials);
      dispatch({ type: "signUpSuccess" });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      dispatch({ type: "loginFailure", payload: err.response.data });
    }
  };
  return (
    <div
      className="p-3 mx-auto"
      style={{ maxWidth: "32rem", background: "white" }}
    >
      <div className="py-4 text-center d-flex align-items-center justify-content-between">
        <h3 className="fw-bold d-flex align-items-center gap-2">
          <Icon icon="codicon:account" /> <span>Sign-up</span>
        </h3>
        <span>
          Have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            <span className="primary-color fw-bold">Login</span>
          </Link>{" "}
        </span>
      </div>
      {/* sign-up form */}
      <form className="d-flex flex-column gap-2">
        <div className="d-flex w-100 gap-3">
          <div>
            <label>
              First name <b className="text-danger">*</b>{" "}
            </label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              autoFocus
              className="py-3 px-2 rounded border w-100"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              Last name <b className="text-danger">*</b>{" "}
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="py-3 px-2 rounded border w-100"
              onChange={handleChange}
            />
          </div>
        </div>

        <label>
          Phone Number <b className="text-danger">*</b>{" "}
        </label>

        <input
          type="number"
          name="phonenumber"
          placeholder="Number"
          className="py-3 px-2 rounded border"
          onChange={handleChange}
        />
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
          disabled={loading}
          style={{ backgroundColor: "#376679", color: "white" }}
          onClick={handleClick}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}
