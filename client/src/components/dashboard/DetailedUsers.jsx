import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import {Col} from 'react-bootstrap'
import InputField from '../InputField';
import FormWrapper from './FormWrapper';
import { useParams } from 'react-router';
import axios from 'axios';

export default function DetailedUsers() {

    const {id} = useParams();
    console.log(id);

    const [formData, setFormData] = useState({
        user_firstname: undefined,
        user_lastname: undefined,
        user_phonenumber : undefined,
        user_email: undefined,
        role: undefined,
    });

      useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const res = await axios.get(`/api/user/${id}`);
                setFormData(res.data);
            } catch (err){
                console.log(err);
            }
        }
        fetchUser();
      }, [id]);

    const handleProfileChange = async (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>(
            {...prev, [name]: value}
        ))
    }
    const handleProfileSave = async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.put(`/api/user/${formData.user_id}`, formData);
          console.log(res.data.user);
          setFormData(res.data.user);
          alert(res.data.message);
        } catch (err) {
          console.error("Error updating profile", err);
          alert(err);
        }
      }
      console.log(formData);
  return (
    <Wrapper>
    <div>
        <h3>User</h3>
    </div>
    <FormWrapper>
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
        <Col md='6'>

        <label htmlFor="cateogry" className="fw-bold mb-2">
                Role
              </label>
            <select name="role" id="role" className='w-100 p-2 border' onChange={handleProfileChange} value={formData.role}>
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
        </Col>
        </div>
        <div className="w-100 d-flex justify-content-between">

        <button type="submit" className="btn btn-secondary mt-3 py-2">Edit User</button>
        </div>
        </form>
    </FormWrapper>
    </Wrapper>
  )
}
