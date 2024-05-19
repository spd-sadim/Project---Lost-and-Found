import Card from "react-bootstrap/Card";
import { Icon } from "@iconify-icon/react";

export default function AnnouncementCard({ item }) {
  return (
    <Card
      className="position-relative h-100"
      style={{ width: "18rem", backgroundColor: "#eff1f4" }}
    >
      <Card.Img variant="top" src={`http://localhost:3000/Images/${item.image}`} className="p-2 rounded h-100 img-fluid" />
      <span
        className="position-absolute px-3 py-1 fw-bold"
        style={{
          top: "15px",
          left: "15px",
          backgroundColor: "white",
          color: item.type == "found" ? "blue" : "#FF4E51",
          border: "1px solid #7a7c93",
          borderRadius: "20px",
          opacity: ".7",
        }}
      >
        {item.type}
      </span>
      <Card.Body>
        <Card.Title>
          <div className="d-flex fw-bold">
           {item.item_name}
          </div>
        </Card.Title>
        <Card.Text>
          <span className="d-flex align-items-center gap-1">
            <Icon icon="system-uicons:location" width="25" height="25" className="font-sec" />{" "}
            {item.location}
          </span>
          <span className="d-flex align-items-center gap-2">
          <Icon icon="lets-icons:date-today-light" className="font-sec" width="25" height="25" /> {item.date}{" "}
          </span>
        </Card.Text>
        <button
          type="button"
          className="myBtn-primary px-3 py-1 rounded text-white fw-bold"
        >
          Details
        </button>
      </Card.Body>
    </Card>
  );
}
