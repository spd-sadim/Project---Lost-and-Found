import { useState } from "react";
import InputField from "../InputField";
import FormWrapper from "./FormWrapper";
import Wrapper from "./Wrapper";
import axios from "axios";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit =  async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword != verifyPassword) {
      setError("New password and verification password do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 character long");
      return;
    }

    try {
      const result = await axios.post("/api/user/change-password", {
        currentPassword,
        newPassword,
      });
      console.log()
      setSuccess( result.data.message ||"Updated Password succesfully");
      console.log(result);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };
  return (
    <Wrapper>
      <FormWrapper>
        <h4 className="py-2"> Password</h4>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <InputField
            type="password"
            label="Current Password"
            value={currentPassword}
            handleChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <InputField
            type="password"
            label="New Password"
            value={newPassword}
            handleChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <InputField
            type="password"
            label="Verify Password"
            value={verifyPassword}
            handleChange={(e) => {
              setVerifyPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-secondary my-4">
            Update Password
          </button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}
