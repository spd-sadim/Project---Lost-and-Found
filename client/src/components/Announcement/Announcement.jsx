import AnnouncementCard from "./AnnouncementCard";
import {Container} from "react-bootstrap"
export default function Announcement() {
  return (
    <div className="py-2">
      <Container>
        <div className="title">
          <h3>Announcement</h3>
        </div>
        <AnnouncementCard />
      </Container>
    </div>
  );
}
