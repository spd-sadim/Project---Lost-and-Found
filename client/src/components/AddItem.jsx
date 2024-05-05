import { useRef, useState } from "react";
import { Col } from "react-bootstrap";
import InputField from "./InputField";
import { addInputField } from "../utlis/Utlis";
import {Icon} from "@iconify-icon/react"
import { categories } from "./category";

export default function AddItem() {
  const [image, setImage] = useState("");
  const [isActiveStatus, setIsActiveStatus] = useState('report');

  const [isPerson, setIsPerson] = useState(false);

  

  const handleChange = (e) => {
    const file = e.target.files[0];
    const src = URL.createObjectURL(file);
    setImage(src);
  };

  //Create Reference to file input
  const uploadRef = useRef(null);

  //Function to trigger the click event on the file input
  const handleFile = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleIsPerson = (e)=>{
    setIsPerson( parseInt(e.target.value) === 10 ? true : false);
  }


  console.log(isPerson);


  const handleActiveStatus = (e)=>{
    setIsActiveStatus(e.target.value)
    
  }
  return (
    <div className="px-lg-5">
      <h4 className="py-3">Add Lost Item</h4>
      <div className="form-wrapper px-4 py-3 rounded border bg-white">
        {/* <form>
          <div className="row gy-3">
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column mb-2">
                <span>What was lost? *</span>
              </label>
              <input
                type="text"
                className="w-100  border rounded p-2"
                name="name"
                placeholder="What was lost"
              />
            </Col>
         
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column mb-2">
                <span>Category *</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                className="p-2 w-100 border rounded"
                placeholder="What was lost"
              />
            </Col>
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column mb-2">
                <span>Location *</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                className="p-2 w-100 border rounded"
                placeholder="What was lost"
              />
            </Col>
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column mb-2">
                <span>Date lost</span> <span></span>
              </label>
              <input type="date" name="name" className="p-2 w-100 border rounded" />
            </Col>

            <Col md="6">
              <label htmlFor="" className="d-flex flex-column mb-2">
                <span>Additional Information</span> <span></span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Additional Information"
                className="p-2 w-100 border rounded"
              />
            </Col>

            <Col md="6">
              <div className="border mx-auto w-50 position-relative">
                <button
                  type="button"
                  className="position-absolute end-0 top-2"
                  onClick={handleFile}
                >
                  click
                </button>
                <img src={image} alt="" />
              </div>
              <input
                type="file"
                className="d-none"
                name="imageEl"
                id="imageFile"
                accept="image/*"
                onChange={handleChange}
                ref={uploadRef}
              />
            </Col>
          </div>
        </form> */}

        <form>
          <div className="row gy-3">
            {addInputField.map((item) => (
              <Col md="6" key={item.id}>
                <InputField
                  type={item.type}
                  placeholder={item?.placeholder}
                  label={item.label}
                />
              </Col>
            ))}

            {/* <Col md="6">
              <label htmlFor="" className="mb-2"> Status </label>
              <div className="status-btn-group d-flex flex-wrap gap-2 fw-bold">
                <button type="button" value="report" className={`btn  btn-outline-primary fw-bold d-flex align-items-center gap-2  ${isActiveStatus == 'report' ? 'active' : ''} `} onClick={handleActiveStatus}> <Icon icon="mdi:stars" width="26" height="26" /> Reported</button>
                <button type="button" value="claim" className={`btn  btn-outline-secondary fw-bold d-flex align-items-center gap-2 ${isActiveStatus == 'claim' ? 'active' : ''}`} onClick={handleActiveStatus}><Icon icon="mdi:circular-arrows" width="26" height="26" /> Claimed</button>
                <button type="button" value="return" className={`btn  btn-outline-success fw-bold d-flex align-items-center gap-2  ${isActiveStatus == 'return' ? 'active' : ''} `} onClick={handleActiveStatus}><Icon icon="ph:seal-check" width="26" height="26" /> Returned</button>
              </div>
            </Col>
             */}
            <Col md="6">
            <label htmlFor="" className="mb-2">Category</label>
            <select name="category" className="p-2 w-100 border" onChange={handleIsPerson}>
      <option defaultValue={"all"}>All category</option>
        {categories.map((category, index) => (
          <option value={index+1} key={index}> {category} </option>
        ))}
      </select>
            </Col>

          {isPerson && <>
            <Col md="6">
           <InputField type='text' label='age' />
            </Col>
            <Col md="6">

           <InputField type='text' label="Father's Name" />
            </Col>
            <Col md="6">
           <InputField type='text' label="Mother's Name" />
            </Col>
            <Col md="6">
           <InputField type='text' label="Skin color" />
            </Col>
          </>}
          </div>
        </form>
      </div>
    </div>
  );
}
