import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="p-3 mx-auto" style={{ maxWidth: "32rem" }}>
      <h1 className="p-4 text-center">Log In</h1>
      <form className="d-flex flex-column gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoFocus
          className=" py-3 px-2 rounded border-0"
        />
        <input
          type="password"
          name="pwd"
          placeholder="Password"
          className="px-2 py-3 rounded border-0"
        />
        <button
          type="button"
          className="p-3 rounded"
          style={{ backgroundColor: "#376679", color: "white" }}
        >
          Log In
        </button>
        <p>
          {" "}
          Dont have an account?{" "}
          <Link to="/sign-up" className="text-decoration-none">
            <span className="primary-color fw-bold ">Sign Up</span>
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
