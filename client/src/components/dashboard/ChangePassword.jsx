import { useState } from "react";
import InputField from "../InputField";
import FormWrapper from "./FormWrapper";
import Wrapper from "./Wrapper";

export default function ChangePassword() {
  const [error, setError] = useState("");
  return (
    <Wrapper>
      <FormWrapper>
        <h4 className="py-2"> Password</h4>
        {error && <p className="text-danger"></p>}
        <InputField type="password" label="Current Password" />
        <InputField type="password" label="New Password" />
        <InputField type="password" label="Verify Password" />
        <button type="submit" className="btn btn-secondary">
          Update Password
        </button>
      </FormWrapper>
    </Wrapper>
  );
}
