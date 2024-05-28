import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { categories } from "../../components/category";
import NavbarNav from "../../components/navbar/NavbarNav";
import axios from "axios";
import AnnouncementCard from "../../components/Announcement/AnnouncementCard";
import {  useSearchParams } from "react-router-dom";

const Filter = ({ handleChange, categoryParam }) => {
  return (
    <div className="filters d-flex flex-column gap-4">
      <div className="d-flex justify-content-between">
        <h3>Filter</h3>
        <input type="button" value="clear" className="border-0 bg-white" />
        {/* <Link to='/view-post' className='text-decoration-none'>clear</Link> */}
      </div>
      <div className="filter-category">
        <select
          name="category"
          id="category"
          className="p-2 w-100 border"
          defaultValue={categoryParam || ""}
          onChange={handleChange}
        >
          <option  value="">
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
          id="status"
          className="p-2 w-100 border"
          defaultValue={"All"}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value='found'>Found</option>
          <option value='lost'>Lost</option>
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
      <button
        style={{ backgroundColor: "#cf2e2e" }}
        className="p-3 border-0 rounded fw-bold text-white"
        onClick={handleChange} // Call handleChange function to apply filters
      >
        Apply Filters
      </button>
    </div>
  );
};

export default function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  console.log(categoryParam);
  const [filters, setFilters] = useState({
    // category: searchParams.get('category') || "",
    category : categoryParam || "",
    status: "",
    location: "",
  });

  
  console.log(filters)
  
  useEffect(() => {
    
    const handleFilterChange = async () => {
      try {
        const response = await axios.get("/api/posts", { params: filters });
        console.log(filters)
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleFilterChange(); 
  }, [filters]); 

  return (
    <div>
      <NavbarNav />
      <main className="mt-5 py-5">
        <Container>
          <section className="breacrumb py-5 fw-bold text-dark">
            <a href="/" className="text-dark text-decoration-none">
              Home{" "}
            </a>
            / Listing
          </section>
          <Row>
            <Col lg="3">
              <Filter categoryParam={categoryParam} handleChange={(e) => {
                const { id, value } = e.target;
                setFilters({ ...filters, [id]: value });
              }} />
            </Col>
            <Col lg="9">
              <div className="py-2">
                <p>Showing {posts.length} Results</p>
              </div>
              <Container>
                <div className="row gx-2 gy-3">
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <Col md={4} key={index}>
                        <AnnouncementCard item={post} />
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <span>No result</span>
                    </Col>
                  )}
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
