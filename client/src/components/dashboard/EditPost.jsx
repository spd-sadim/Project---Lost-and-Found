import { useContext, useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
// import { Icon } from "@iconify-icon/react";
import axios from "axios";
import InputField from "../InputField";
import { categories } from "../category";
import Wrapper from "./Wrapper";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
// import { personInputField } from "../utils/utils"; // Uncomment if needed

export default function EditPost({ addInputField, title }) {
  const [image, setImage] = useState(null);
  const [isPerson, setIsPerson] = useState(false);
  const [data, setData] = useState({
    item_name: "",
    location: "",
    date: "",
    additional_info: "",
    category_id: "",
    image: "",
  });
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const endpoint = `/api/${type}/update/${id}`;
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/${type}/view/${id}`);
        const fetchedData = res.data[0];
        // Format date to YYYY-MM-DD
        if (fetchedData.date) {
          fetchedData.date = new Date(fetchedData.date)
            .toISOString()
            .split("T")[0];
        }
        setData(fetchedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [type, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadRef = useRef(null);

  const handleFile = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleIsPerson = (e) => {
    const { name, value } = e.target;
    setIsPerson(parseInt(value) === 10 ? true : false); // Change 10 to the appropriate category value
    setData((prev) => {
      return { ...prev, [name]: parseInt(value) };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (image) {
        formData.append("image", image);
      }
      console.log(formData);
      const apiEndpoint = isPerson ? "/endpoint" : endpoint;
      const res = await axios.put(apiEndpoint, formData);
      // Handle response as needed
      setSuccessMessage(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <h4 className="py-3">
        Edit <span>{title}</span> Post
      </h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-wrapper px-4 py-3 rounded border bg-white">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="row gy-3">
            {addInputField.map((item) => (
              <Col md="6" key={item.id}>
                <InputField
                  type={item.type}
                  placeholder={item?.placeholder}
                  name={item.name}
                  label={item.label}
                  handleChange={handleChange}
                  value={data[item.name]}
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
                value={data.additional_info}
                placeholder="Additional Information"
                onChange={handleChange}
              />
            </Col>
            <Col md="6">
              <label htmlFor="category" className="fw-bold mb-2">
                Category
              </label>
              <select
                name="category_id"
                id="category"
                className="p-2 w-100 border"
                onChange={handleIsPerson}
                // value={data.category}
                value={data.category_id}
                required
              >
                <option disabled hidden value="">
                  Please choose
                </option>
                {categories.map((category, index) => (
                  <option value={index + 1} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </Col>

            {/* render person inputField */}
            {/* {isPerson &&
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
              ))} */}
          </div>
        </div>

        <div className="rounded border px-2 py-3 bg-white mt-3">
          <label className="px-3 fw-bold">Image</label>
          <hr />

          {image || data.image ? (
            <div className="image-preview-wrapper w-100 overflow-hidden bg-secondary position-relative rounded">
              <button
                type="button"
                className="position-absolute border-0 rounded-circle bg-dark text-white px-3 py-2"
                style={{ top: "5px", right: "5px" }}
                onClick={() => {
                  setImage(null);
                  setData((prev) => {
                    const { image, ...otherData } = prev;
                    return otherData;
                  });
                }}
              >
                X
              </button>
              <div
                className="mx-auto"
                style={{ height: "auto", width: "259px" }}
              >
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `http://localhost:3000/Images/${data.image}`
                  }
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
            required={!data.image}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-secondary">
            Edit post
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
