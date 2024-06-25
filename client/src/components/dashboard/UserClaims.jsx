import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ClaimCard from "./ClaimCard";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';



const  ContactModal = ({handleContactModal, show, phone, email}) =>{

  return (
    <>

      <Modal show={show} onHide={handleContactModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> User email : {email}</p>
          <p> User phone number : {phone}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleContactModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const UserClaims = () => {
  const [myClaims, setMyClaims] = useState([]);
  const [postedClaims, setPostedClaims] = useState([]);
  const [show, setShow] = useState(false);

  console.log(myClaims)

  useEffect(() => {
    // Fetch the list of claims made by the user
    const fetchMyClaim = async () => {
      try {
        const response = await axios.get("/api/claim/");
        setMyClaims(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchPostedClaim = async () => {
      try {
        const response = await axios.get(`/api/claim/posted-claim`);
        setPostedClaims(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyClaim();
    fetchPostedClaim();
  }, []);

  const handleApprove = async (claimId) => {
    try {
      await axios.put(`/api/claim/approve/${claimId}`);
      setPostedClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === claimId ? { ...claim, status: "approved" } : claim
        )
      );
      alert("Approved claimed");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (claimId) => {
    try {
      await axios.put(`/api/claim/decline/${claimId}`);
      setPostedClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === claimId ? { ...claim, status: "Rejected" } : claim
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactModal = ()=>{
    setShow(!show);
  }

  return (
    <section>
      <div className="py-2">
        <div className="bg-pri text-white text-center py-1">
          <h2>My Claims </h2>
        </div>
        {myClaims.length > 0 ? (
          myClaims.map((claim) => (
            <ClaimCard key={claim.id} postedClaims={claim}>
              <button type="button" className="btn btn-danger mx-2">Cancel</button>
              <button type="button" className={`btn ${claim.status === "approved" ? "btn-success" : "btn-secondary"}`} onClick={handleContactModal} disabled={claim.status === "approved" ? false : true}>
                {" "}
                {claim.status === "approved"
                  ? "Contact details"
                  : "Claim " + claim.status}
              </button>
      <ContactModal show={show} handleContactModal={handleContactModal} phone={claim.user_phonenumber} email={claim.user_email} />

            </ClaimCard>
          ))
        ) : (
          <>
            <p className="fs-5 mt-2">No claims reported</p>
          </>
        )}
      </div>

      <div className="py-3">
        <div className="bg-pri text-white text-center py-1">
          <h2>Claims on My Posts</h2>
        </div>
        {postedClaims.length > 0 ? (
          postedClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              postedClaims={claim}
              claimType="postedClaim"
            >
              <button type="button" className="btn btn-danger mx-2" onClick={() => handleReject(claim.id)}>
                Reject
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => handleApprove(claim.id)}>
                Approve
              </button>
            </ClaimCard>
          ))
        ) : (
          <>
            <p>No claims reported</p>
          </>
        )}
      </div>
    </section>
  );
};
