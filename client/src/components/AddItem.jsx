import { useRef, useState } from "react";
import { Col } from "react-bootstrap";
export default function AddItem() {
  const [image, setImage] = useState("");

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
  return (
    <div>
      <h4>Add Lost Item</h4>
      <div className="form-wrapper px-2 py-3 rounded border bg-white">
        <form>
          <div className="row gy-3">
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column">
                <span>What was lost? *</span>
              </label>
              <input
                type="text"
                className="w-100 p-2"
                name="name"
                placeholder="What was lost"
              />
            </Col>
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column">
                <span>Category *</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                className="p-2 w-100"
                placeholder="What was lost"
              />
            </Col>
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column">
                <span>Location *</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                className="p-2 w-100"
                placeholder="What was lost"
              />
            </Col>
            <Col md="6">
              <label htmlFor="" className="d-flex flex-column">
                <span>Date lost</span> <span></span>
              </label>
              <input type="date" name="name" className="p-2 w-100" />
            </Col>

            <Col md="6">
              <label htmlFor="" className="d-flex flex-column">
                <span>Additional Information</span> <span></span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Additional Information"
                className="p-2 w-100"
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
        </form>
      </div>
    </div>
  );
}
