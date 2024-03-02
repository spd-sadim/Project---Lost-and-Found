import AnnouncementCard from "./AnnouncementCard";
import { Col, Container, Row } from "react-bootstrap";
import image from "../../assets/samsung.jpg";

export default function Announcement() {
  const items = [
    {
      id: 1,
      name: "Samsung s21",
      category: "mobile",
      img: image,
      location: "Kiritipur",
      status: "Found",
      date: "2024-02-40",
    },
    {
      id: 2,
      name: "Samsung s21",
      category: "mobile",
      img: image,
      location: "Kiritipur",
      status: "Found",
      date: "2024-02-40",
    },
    {
      id: 3,
      name: "Samsung s21",
      category: "mobile",
      img: image,
      location: "Kiritipur",
      status: "Lost",
      date: "2024-02-40",
    },
    {
      id: 4,
      name: "Samsung s21",
      category: "mobile",
      img: image,
      location: "Kiritipur",
      status: "Found",
      date: "2024-02-40",
    },
  ];
  return (
    <div className="py-2">
      <Container>
        <div className="title py-5">
          <h3>Announcement</h3>
        </div>
        <Row gap={8}>
          {items.map((item) => (
            <Col lg={3} md={4} key={item.id}>
              <AnnouncementCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
