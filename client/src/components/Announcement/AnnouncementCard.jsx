import Card from "react-bootstrap/Card";
import image from "../../assets/samsung.jpg";

export default function AnnouncementCard() {
  const item = {
    id: "1",
    name: "Samsung s21",
    category: "mobile",
    img: image,
    location: "Kiritipur",
    status: "Found",
    date: "2024-02-40",
  };
  return (
    <Card
      className="position-relative"
      style={{ width: "18rem", backgroundColor: "#eff1f4" }}
    >
      <Card.Img variant="top" src={image} className="p-2 rounded" />
      <span
        className="position-absolute rounded px-3 py-1 fw-bold"
        style={{
          top: "15px",
          left: "15px",
          backgroundColor: "white",
          color: "blue",
          border: "1px solid gray",
          opacity: ".6",
        }}
      >
        {item.status}
      </span>
      <Card.Body>
        <Card.Title>
          <div className="d-flex justify-content-between primary-color">{item.name}</div>
        </Card.Title>
        <Card.Text>
          <p className="primary-color">{item.date}</p>
        </Card.Text>
        <button type="button">Details</button>
      </Card.Body>
    </Card>
  );
}
