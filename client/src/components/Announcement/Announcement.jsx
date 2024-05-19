import AnnouncementCard from "./AnnouncementCard";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Announcement() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try{

        const response = await axios.get('/api/posts/all')
        setPosts(response.data);
      } catch(err){
        alert(err);
      }

    }
    fetchData();
  }, [])
  return (
    <div className="py-2">
      <div className="title py-5 text-center position-relative">
        <h3 className="heading primary-color fw-bold">Announcement</h3>
      </div>
      <Container>
        <Row gap={8} className="gy-3" >
          {posts.map((item) => (
            <Col lg={3} md={4} key={item.id}>
              <AnnouncementCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
