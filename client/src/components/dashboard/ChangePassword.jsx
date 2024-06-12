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


  const handleSubmit = (e) => {
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
      const result = axios.post("/api/user/change-password", {currentPassword, newPassword});
      setSuccess("Updated Password succesfully");
    } catch (err) {
      console.log(err);
      setError(err);
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
            handleChange={(e)=> {setCurrentPassword(e.target.value)}}
          />
          <InputField
            type="password"
            label="New Password"
            value={newPassword}
            handleChange={(e)=> {setNewPassword(e.target.value)}}

          />
          <InputField
            type="password"
            label="Verify Password"
            value={verifyPassword}
            handleChange={(e)=> {setVerifyPassword(e.target.value)}}
          />
          <button type="submit" className="btn btn-secondary my-4">
            Update Password
          </button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}
