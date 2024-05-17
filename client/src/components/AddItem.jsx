import { useContext, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import InputField from "./InputField";
import { Icon } from "@iconify-icon/react";
import { categories } from "./category";
import { personInputField } from "../utils/utils";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AddItem({ addInputField, title, endpoint }) {
  const [image, setImage] = useState(null);
  const [isPerson, setIsPerson] = useState(false);
  const [data, setData] = useState({});
  const { user } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // const src = URL.createObjectURL(file);
    setImage(file);
  };

  //Create Reference to file input
  const uploadRef = useRef(null);

  //Function to trigger the click event on the file input
  const handleFile = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleIsPerson = (e) => {
    const { name, value } = e.target;
    setIsPerson(parseInt(value) === 10 ? true : false);
    setData((prev) => {
      return { ...prev, [name]: parseInt(value) };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  //submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append text data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      // Append image file
      if (image) {
        formData.append("image", image);
      }
      formData.append("user_id", user.user_id);

      // Update endpoint if it's a person
      const apiEndpoint = isPerson ? "/endpoint" : endpoint;
      console.log(data);
      console.log("endpoint", endpoint);
      const res = await axios.post(endpoint, formData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-lg-5">
      <h4 className="py-3">
        Create <span>{title}</span> Post
      </h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-wrapper px-4 py-3 rounded border bg-white">
          <div className="row gy-3">
            {addInputField.map((item) => (
              <Col md="6" key={item.id}>
                <InputField
                  type={item.type}
                  placeholder={item?.placeholder}
                  name={item.name}
                  label={item.label}
                  handleChange={handleChange}
                />
              </Col>
            ))}

            <Col md="6">
              <label htmlFor="additionalInfo" className="d-block mb-2 fw-bold ">
                Additional Information
              </label>
              <textarea
                className="w-100 p-2 border rounded"
                name="additional_info"
                rows={1}
                id="additionalInfo"
                placeholder="Additional Information"
                onChange={handleChange}
              />
            </Col>
            <Col md="6">
              <label htmlFor="cateogry" className="fw-bold mb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="p-2 w-100 border"
                onChange={handleIsPerson}
                defaultValue={"choose"}
                required
              >
                <option disabled hidden value="choose">
                  Please choose{" "}
                </option>
                {categories.map((category, index) => (
                  <option value={index + 1} key={index}>
                    {" "}
                    {category}{" "}
                  </option>
                ))}
              </select>
            </Col>

            {/* render person inputField */}
            {isPerson &&
              personInputField.map((input) => (
                <Col md="4" key={input.id}>
                  <InputField
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    label={input.label}
                    handleChange={handleChange}
                  />
                </Col>
              ))}
          </div>
        </div>

        <div className="rounded border px-2 py-3 bg-white mt-3">
          <label className="px-3 fw-bold">Image</label>
          <hr />

          {image ? (
            <div className="image-preview-wrapper w-100 overflow-hidden bg-secondary position-relative rounded">
              <button
                type="button"
                className="position-absolute border-0 rounded-circle bg-dark text-white px-3 py-2"
                style={{ top: "5px", right: "5px" }}
                onClick={() => setImage(null)}
              >
                X
              </button>
              <div
                className="mx-auto"
                style={{ height: "auto", width: "259px" }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  className="img-fluid object-fit-contain"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="w-100 d-flex align-items-center justify-content-center">
              <p className="mb-0 user-select-none" onClick={handleFile}>
                <span className="text-primary cursor-pointer">Browse</span> for
                file
              </p>
            </div>
          )}
          <input
            type="file"
            className="d-none"
            name="imageEl"
            id="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            ref={uploadRef}
            required
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-secondary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
