import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeroLeft() {
  return (
    <div>
      <h1>Bhetayoo Lost & found solutions</h1>
      <p>
        "Our website is dedicated to simplifying the process of reuniting lost
        belongings with their owners."
      </p>
      <div>
        <Link to="/report-item">
          <button
            className="myBtn-primary text-white px-3 py-3 rounded fw-bold m-2"
            value="Found"
          >
            Submit Found Item
          </button>
        </Link>
        <Link to="/report-item">
          <button
            className="myBtn-sec text-white px-3 py-3 rounded ml-2 fw-bold"
            value="Found"
          >
            Submit Found Item
          </button>
        </Link>
      </div>
    </div>
  );
}
