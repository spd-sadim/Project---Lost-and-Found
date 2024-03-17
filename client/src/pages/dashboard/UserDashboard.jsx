import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";

export default function UserDashboard() {
  return (
    <div className="main container-fluid">
      <Row className="flex-nowrap">
        <Col md={2} sm={3} xs={2}>
          <Sidebar />
        </Col>
        <Col md={9} xs={9}>
          <main className="content-container mt-5">
            <Outlet />
          </main>
        </Col>
      </Row>
    </div>
  );
}
