import React from "react";
import { Container } from "react-bootstrap";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-content text-center py-5">
          <h1>Bhetayoo Lost & found solutions</h1>
          <p>
            "Our website is dedicated to simplifying the process of reuniting
            lost belongings with their owners.
          </p>
        <div className="search w-100 d-flex justify-content-center px-5 pt-3 position-relative">
          <input type="text" name="search" className="w-50 py-3 px-2 rounded" />
          <button>Check</button>
        </div>
        </div>
      </Container>
    </section>
  );
}
