import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router'
import { InfoItem } from './DetailedView';
import {Icon} from "@iconify-icon/react"
import { categories } from './category';

export default function Claim() {
    const { id} = useParams();
    const location = useLocation();
    const {item, type} = location.state || null;
    console.log(item)
    console.log(type)
    console.log(id)

    
  return (
    <div>
    <Container>
      <Row>
        <Col lg={4} md={5}>
        <h3>{item.item_name}</h3>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <img src={`http://localhost:3000/Images/${item.image}`} alt="item image" className="img-fluid rounded" />
        </div>
        </Col> 
        <Col lg={8} md={7}>
          <button>status</button>
          <h5 className="d-flex  align-items-center gap-2 font-primary fw-bold">
            <Icon icon="game-icons:binoculars" width="35" height="35" />
            <span>Item details</span>
          </h5>

          {/* <InfoItem icon="gg:nametag" label="Name" value={item.item_name} />
          <InfoItem icon="tabler:category-filled" label="Category" value={item.category} />
          <InfoItem icon="system-uicons:location" label="Location" value={item.location} />
          <InfoItem icon="lets-icons:date-today-light" label="Date" value={item.date} /> */}
          <div>
            <p> Category : {categories[item.category_id - 1]}</p>
            <p> Location : {item.location}</p>
            <p> Date : {item.date.split("T")}</p>
          </div>

        <div className="description shadow-lg bg-sec p-3 mt-5 border rounded ">
          <h5 className="d-flex align-items-center gap-2 font-primary fw-bold">
            {" "}
            <span>Additional Info </span> 
            <Icon icon="ph:puzzle-piece-light" width="25" height="25" />{" "}
          </h5>

          <p>
            {" "}
            {item.additional_info}
          </p>
        </div>

        <div className='d-flex flex-column border  p-2 mt-2 text-center'>
        <p>Add Message: </p>
        <textarea name="" rows='1' placeholder='Proof' /> 
        <p>Attach image proof: </p>
        <input type='file' accept='image/*'/>
        <button className='p-2 rounded text-white bg-pri mt-2' >claim</button>
        </div>

        </Col>
      </Row>
    </Container>
  </div>
  )
}
