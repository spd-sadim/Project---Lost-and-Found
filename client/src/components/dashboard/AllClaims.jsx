import { useEffect, useState } from "react";
import ClaimCard from "./ClaimCard";
import axios from "axios";

const AllClaims = () => {
  const [myClaims, setMyClaims] = useState([]);
  useEffect(() => {
    // Fetch the list of claims made by the user
    const fetchMyClaim = async () => {
      try {
        const response = await axios.get("/api/claim/all");
        setMyClaims(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyClaim();
  }, []);

  const handleApprove = async (claimId) => {
    try {
      await axios.put(`/api/claim/approve/${claimId}`);
      setMyClaims((prevClaims) =>
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
      setMyClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === claimId ? { ...claim, status: "Rejected" } : claim
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  console.log(myClaims)
  return (
    <section>
      <div className="py-3">
        <div className="bg-pri text-white text-center py-1">
          <h2>All Claims</h2>
        </div>
        {myClaims.length > 0 ? (
          myClaims.map((claim) => (
            <ClaimCard
              key={claim.id}
              postedClaims={claim}
              claimType="postedClaim"
            >
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={() => handleReject(claim.id)}
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleApprove(claim.id)}
              >
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

export default AllClaims;
