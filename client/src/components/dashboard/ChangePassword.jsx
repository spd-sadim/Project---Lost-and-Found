import InputField from "../InputField";
import FormWrapper from "./FormWrapper";
import Wrapper from "./Wrapper";

export default function ChangePassword() {
  return (
    <Wrapper>
    
    <FormWrapper>
    <h4>Change Password</h4>
        <InputField type='password' placeholder='Current Password'/>
        <InputField type='password' placeholder='New Password' />
        <button type="submit" className="btn btn-secondary">Update Password</button>
    </FormWrapper>
    </Wrapper>
  )
}
