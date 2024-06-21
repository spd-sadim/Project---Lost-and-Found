import React from "react";
import { Container } from "react-bootstrap";
import "./hero.css";
import HeroForm from "./HeroForm";
import svg from '../../assets/app-banner/category-text-shape.svg'

export default function Hero() {
  return (
    <section className="hero position-relative">
      <Container className="h-100 d-flex align-items-center justify-content-center ">
        <div className="hero-wrapper py-5 position-relative ">
          <div className="hero-content text-center py-5">
            <h1>Reuniting lost belongings with their owners.</h1>
            <p className="font-sec">
              Browse lost and found items from our vast network of over 11,500
              diligent finders
            </p>
          </div>
          <HeroForm />

        <img src={svg} alt="" className="d-none d-lg-inline position-absolute " style={{bottom: '60px', right: '-50px'}}/>
        </div>
      </Container>
    </section>
  );
}
