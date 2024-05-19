import { useContext, useState } from "react";
import InputField from "../InputField";
import { AuthContext } from "../../context/AuthContext";
import {Col} from "react-bootstrap"
import axios from 'axios';

export default function Profile() {
  const { user, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: user.user_id,
    user_firstname: user.user_firstname,
    user_lastname: user.user_lastname,
    user_phonenumber: user.user_phonenumber,
    user_email: user.user_email,
  });
// console.log(formData)
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.put('/api/user/profile', formData);
      console.log(res.data.user)
      dispatch({type: "updateProfileSuccess",payload: res.data.user});
      alert('Profile updated successfully');
    } catch (err) {
      console.error("Error updating profile", err);
      alert('An error occurred while updating the profile');
    }
  }

  const handleLogout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    history.push("/login"); // Redirect to login page
  };

  console.log(user);
  return (
    <div className="px-lg-5">
      <h3 className="fw-bol py-3">Edit profile</h3>
      <div className="form-wrapper px-4 py-3 rounded border bg-white">
        <h4 className="py-3">My profile</h4>
        <form onSubmit={handleProfileSave}>
        <div className="row gy-3">
        <Col md='6'>
          <InputField
            type="text"
            label="First name"
            name='user_firstname'
            value={formData.user_firstname}
            handleChange={handleProfileChange}
          />
        </Col>
        <Col md='6'>
          <InputField
            type="text"
            label="Last name"
            name='user_lastname'
            value={formData.user_lastname}
            handleChange={handleProfileChange}
          />
        </Col>
        <Col md='6'>
          <InputField
            type="text"
            label="Number"
            name='user_phonenumber'
            value={formData.user_phonenumber}
            handleChange={handleProfileChange}
          />
        </Col>
        <Col md='6'>
          <InputField
            type="email"
            label="Email"
            name='user_email'
            value={formData.user_email}
            handleChange={handleProfileChange}
          />
        </Col>
        </div>
        <div className="w-100 d-flex justify-content-between">

        <button type="submit" className="btn btn-secondary mt-3 py-2">Save Profile</button>
        <button type="button" onClick={handleLogout} className="btn btn-danger mt-3 py-2">Logout</button>
        </div>
        </form>
      </div>
    </div>
  );
}
