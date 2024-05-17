import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { categories } from "../../components/category";

const Filter = ({ handleChange }) => {
  return (
    <div className="filters d-flex flex-column gap-4">
    <div className="d-flex justify-content-between">
      <h3>Filter</h3>
      <input type="reset" value="clear" className="border-0 bg-white"/>
    </div>
      <div className="filter-category">
        <select
          name="category"
          id="category"
          className="p-2 w-100 border"
          defaultValue={"choose"}
          onChange={handleChange}
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
      </div>
      <div className="status">
        <select
          id='status'
          className="p-2 w-100 border"
          defaultValue={"All"}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="found">Found</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      <div className="filter-location">
        <input
          type="text"
          className="p-2 w-100 border"
          name="location"
          id="location"
          placeholder="Enter location"
          onChange={handleChange}
        />
      </div>
      <div className="filter-keywords">
        <input
          type="text"
          className="p-2 w-100 border"
          name="keywords"
          id="keywords"
          placeholder="Enter keyword"
          onChange={handleChange}
        />
      </div>
      <button style={{backgroundColor: "#cf2e2e"}} className="p-3 border-0 text-white rounded fw-bold" onClick={console.log("apply ")}>Apply Filters</button>
    </div>
  );
};
export default function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    date: "",
    location: "",
    keywords: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts', { params: filters });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    fetchPosts();
}, [filters]);

  console.log(filters);
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <section className="breacrumb"></section>
      <main className="mt-5">
        <Container>
          <Row>
            <Col lg="3">
              <Filter handleChange={handleFilterChange} />
            </Col>
            <Col lg="9">
              <div>content</div>
              <section>
                  here post
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
