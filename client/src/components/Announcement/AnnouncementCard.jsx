import Card from "react-bootstrap/Card";

export default function AnnouncementCard({ item }) {
  return (
    <Card
      className="position-relative mw-100"
      style={{ width: "18rem", backgroundColor: "#eff1f4" }}
    >
      <Card.Img variant="top" src={item.img} className="p-2 rounded" />
      <span
        className="position-absolute px-3 py-1 fw-bold"
        style={{
          top: "15px",
          left: "15px",
          backgroundColor: "white",
          color: item.status == "Found" ? "blue" : "#ed6854",
          border: "1px solid gray",
          borderRadius: "20px",
          opacity: ".7",
        }}
      >
       {item.status}
      </span>
      <Card.Body>
        <Card.Title>
          <div className="d-flex justify-content-between primary-color">
            {item.name}
          </div>
        </Card.Title>
        <Card.Text>
          <span className="d-block">{item.location}</span>
          {item.date}
        </Card.Text>
        <button type="button p-2">Details</button>
      </Card.Body>
    </Card>
  );
}
