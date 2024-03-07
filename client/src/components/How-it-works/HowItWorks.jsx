import { Col, Container, Row } from "react-bootstrap";
import img1 from "../../assets/search.png";
import img2 from "../../assets/create.png";
import img3 from "../../assets/fhome.png";

export default function HowItWorks() {
  const works = [
    {
      id: 1,
      title: "View the annoucement",
      img: img1,
      description:
        "If you've lost and found an item check out lost and found item ads",
    },
    {
      id: 2,
      title: "Create an annoucements",
      img: img2,
      description:
        "Create an annoucements about a found and or lost items and publish it on the site",
    },
    {
      id: 3,
      title: "Help Item get home",
      img: img3,
      description:
        "Contact the person who found/ lost item so that item can return home",
    },
  ];
  return (
    <section className="py-5">
      <div className="title text-center position-relative py-2">
        <h3 className="heading-after font-primary fw-bold">How it works</h3>
      </div>
      <Container>
        <Row className="mt-5">
          {works.map((work) => (
            <Col key={work.id} lg={4}>
              <div className="text-center">
                <h5 className="font-primary fw-bold">{work.title}</h5>
                <img src={work.img} alt="How it works image" className="mw-100 h-100"/>
                <p className="font-primary">{work.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
