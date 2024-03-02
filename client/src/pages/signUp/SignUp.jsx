import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 mx-auto" style={{ maxWidth: "32rem" }}>
      <h1 className="p-4 text-center">Sign Up</h1>
      <form className="d-flex flex-column gap-2">
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          autoFocus
          className="py-3 px-2 rounded border-0"
        />
        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          autofocus
          className="py-3 px-2 rounded border-0"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          autofocus
          className="py-3 px-2 rounded border-0"
        />
        <input
          type="number"
          name="number"
          placeholder="Number"
          autofocus
          className="py-3 px-2 rounded border-0"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className=" py-3 px-2 rounded border-0"
        />

        <input
          type="password"
          name="pwd"
          placeholder="New password"
          className="px-2 py-3 rounded border-0"
        />
        <button
          type="button"
          className="p-3 rounded"
          style={{ backgroundColor: "#376679", color: "white" }}
        >
          Log In
        </button>
        <span>
          Have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            <span className="primary-color fw-bold">Login</span>
          </Link>{" "}
        </span>
      </form>
    </div>
  );
}
