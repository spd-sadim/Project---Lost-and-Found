import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

export default function SignUp() {
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
              name="fName"
              placeholder="First Name"
              autoFocus
              className="py-3 px-2 rounded border w-100"
            />
          </div>
          <div>
            <label>
              Last name <b className="text-danger">*</b>{" "}
            </label>
            <input
              type="text"
              name="lName"
              placeholder="Last Name"
              autofocus
              className="py-3 px-2 rounded border w-100"
            />
          </div>
        </div>

        <label>
          Phone Number <b className="text-danger">*</b>{" "}
        </label>

        <input
          type="number"
          name="number"
          placeholder="Number"
          autofocus
          className="py-3 px-2 rounded border"
        />
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
