import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import ClaimCard from './ClaimCard';



export const UserClaims = () => {
    const [myClaims, setMyClaims] = useState([])
  const [postedClaims, setPostedClaims] = useState([]);

    useEffect(() => {
      // Fetch the list of claims made by the user
      const fetchMyClaim = async ()=>{
          try {
            const response = await axios.get("/api/claim/");
            setMyClaims(response.data)
          } catch (err) { 
            console.error(err);
          }
      }
      const fetchPostedClaim = async ()=>{
          try {
            const response = await axios.get(`/api/claim/posted-claim`);
            setPostedClaims(response.data)
          } catch (err) { 
            console.error(err);
          }
      }
      fetchMyClaim();
      fetchPostedClaim()
    }, []);


  return (
    <section>
    <div className='py-2'>
    <div className='bg-pri text-white text-center py-1'>

<h2>My Claims </h2>
      </div>
            {myClaims.length > 0 ? myClaims.map(claim => (
                  <ClaimCard postedClaims={claim} />
                )) : <>
                  <p className='fs-5 mt-2'>No claims reported</p>
                </>}
    </div>


<div className='py-3'>

                  <div className='bg-pri text-white text-center py-1'>

            <h2>Claims on My Posts</h2>
                  </div>
                {postedClaims.length > 0 ? postedClaims.map(claim => (
                  <ClaimCard postedClaims={claim} />
                )) : <>
                  <p>No claims reported</p>
                </>}
</div>
        </section>
  )
}
