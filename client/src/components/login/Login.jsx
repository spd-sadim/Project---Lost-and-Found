import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

export default function Login() {
  return (
    <div
      className="px-4 py-5 mx-auto my-auto"
      style={{ width: "32rem", background: "white" }}
    >
      <div className="mb-4 text-center d-flex align-items-center justify-content-between">
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
        />
        <label>
          Password <b className="text-danger">*</b>{" "}
        </label>
        <input
          type="password"
          name="pwd"
          placeholder="New password"
          className="px-2 py-3 rounded border"
        />
        <button
          type="button"
          className="p-3 rounded"
          style={{ backgroundColor: "#376679", color: "white" }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
