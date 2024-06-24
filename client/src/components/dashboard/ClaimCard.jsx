import { Col, Row } from "react-bootstrap";
import { categories } from "../category";

const ClaimCard = ({postedClaims})=>{
    console.log(postedClaims)
    return(
      <div className='w-100 border px-2 py-2'>
            <div className="claim-heading d-flex flex-column">
                  <div className='d-flex justify-content-between py-2 border-bottom'>
                    <button className='btn btn-primary text-uppercase'>{postedClaims.post_type}</button>
                    <p className="fw-bold">{postedClaims.created_at}</p>
                  </div>
                  <div className="d-flex justify-content-between pt-2 border-bottom">
                    <h5>{postedClaims.item_name}</h5>
                    <p className="fw-bold">Claimed by : {postedClaims.user_name}</p>
                  </div>
                    <Row>
                        <Col>

                <img src={`http://localhost:3000/Images/${postedClaims.item_image}`} style={{width:"10em", height: "10em"}} alt="" />
                        </Col>
                        <Col>
                    <p className="mb-1 fw-bold">Item description</p>
                  <p className="py-2"> {postedClaims.additional_info}</p>
                        </Col>
                        <Col>
                        <p className="m-0"> <span className="fw-bold">Location </span>: {postedClaims.location}</p>
                        <p><span className="fw-bold">Cateory : </span>{categories[postedClaims.category_id - 1]}</p>
                        </Col>
                    </Row>
                  <div className="d-flex gap-5 pt-2 border-bottom">

                  <div>
                       
                    </div>
                  </div>
            </div>

            <div className="content">
            <Row>
                <Col lg="4">
                <p className="fw-bold">Proof image:</p>
                <img src={`http://localhost:3000/Images/${postedClaims.image}`} style={{width:"15em", height: "15em"}} alt="" />
                </Col>
                <Col  lg="4">
                    <p className="fw-bold">Proof message :</p>
                    <p>{postedClaims.message}</p>
                </Col>
            </Row>
            </div>
      </div>
    )
  }

  export default ClaimCard;