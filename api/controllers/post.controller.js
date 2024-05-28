import pool from "../db.js";

// export const getPosts = async (req, res, next) => {
//     const { category, status, date, location, keywords } = req.query;
  
//     let lostPostsQuery = 'SELECT * FROM lost_posts WHERE 1 = 1';
//     let foundPostsQuery = 'SELECT * FROM found_posts WHERE 1 = 1';
  
//     const values = [];
  
//     if (category) {
//       lostPostsQuery += ` AND category_id = $${values.push(category)}`;
//       foundPostsQuery += ` AND category_id = $${values.length}`;
//     }
  
//     // if (status) {
//     //   lostPostsQuery += ` AND status = $${values.push(status)}`;
//     //   foundPostsQuery += ` AND status = $${values.length}`;
//     // }
//     if (status === 'lost') {
//         lostPostsQuery += ' ORDER BY date DESC'; // Example order by date
//       } else if (status === 'found') {
//         foundPostsQuery += ' ORDER BY date DESC'; // Example order by created_at
//       }
  
//     if (date) {
//       lostPostsQuery += ` AND created_at::date = $${values.push(date)}`;
//       foundPostsQuery += ` AND created_at::date = $${values.length}`;
//     }
  
//     if (location) {
//       lostPostsQuery += ` AND location ILIKE $${values.push(`%${location}%`)}`;
//       foundPostsQuery += ` AND location ILIKE $${values.length}`;
//     }
  
//     if (keywords) {
//       lostPostsQuery += ` AND description ILIKE $${values.push(`%${keywords}%`)}`;
//       foundPostsQuery += ` AND description ILIKE $${values.length}`;
//     }

//     try {
//         let allPosts = [];
  
//         if (status === 'lost') {
//           const lostPosts = await pool.query(lostPostsQuery, values);
//           allPosts = lostPosts.rows;
//         } else if (status === 'found') {
//           const foundPosts = await pool.query(foundPostsQuery, values);
//           allPosts = foundPosts.rows;
//         } else {
//           const allLostPosts = await pool.query(lostPostsQuery);
//           const allFoundPosts = await pool.query(foundPostsQuery);
  
//           allPosts = [...allLostPosts.rows, ...allFoundPosts.rows];
//         }
        
//         res.json(allPosts);
  
//     // try {
//     //   const lostPosts = await pool.query(lostPostsQuery, values);
//     //   const foundPosts = await pool.query(foundPostsQuery, values);
  
//     //   const allPosts = [...lostPosts.rows, ...foundPosts.rows];
//     //   res.json(allPosts);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       next(error);
//     }
// };

export const getPosts = async (req, res, next) => {
    const { category, status, location } = req.query;
  
    let lostPostsQuery = 'SELECT * FROM lost_posts WHERE 1 = 1';
    let foundPostsQuery = 'SELECT * FROM found_posts WHERE 1 = 1';
  
    const values = [];
  
    if (category) {
      lostPostsQuery += ` AND category_id = $${values.push(category)}`;
      foundPostsQuery += ` AND category_id = $${values.length}`;
    }
  
    if (status) {
      if (status === 'lost') {
        lostPostsQuery += ' ORDER BY date DESC';
      } else if (status === 'found') {
        foundPostsQuery += ' ORDER BY date DESC';
      }
    }

  
    if (location) {
      lostPostsQuery += ` AND location ILIKE $${values.push(`%${location}%`)}`;
      foundPostsQuery += ` AND location ILIKE $${values.length}`;
    }
      

    try {
        let allPosts = [];
  
        if(category || status || location) {
        if (status === 'lost') {
          const lostPosts = await pool.query(lostPostsQuery, values);
          allPosts = lostPosts.rows;
        } else if (status === 'found') {
          const foundPosts = await pool.query(foundPostsQuery, values);
          allPosts = foundPosts.rows;
        } else {
          const allLostPosts = await pool.query(lostPostsQuery, values);
          const allFoundPosts = await pool.query(foundPostsQuery, values);
  
          allPosts = [...allLostPosts.rows, ...allFoundPosts.rows];
        } 
    } else {
            // If no filters are applied, fetch all posts
            const allLostPosts = await pool.query(lostPostsQuery);
            const allFoundPosts = await pool.query(foundPostsQuery);
  
            allPosts = [...allLostPosts.rows, ...allFoundPosts.rows];
          }
        
        res.json(allPosts);
  
    } catch (error) {
      console.error('Error fetching posts:', error);
      next(error);
    }
};


export const getAllPost = async(req, res, next)=>{
    try {
        const foundPost = await pool.query('SELECT * FROM found_posts');
        const lostPost = await pool.query('SELECT * FROM lost_posts');
        // const allPost = {foundPost}
        const allPost = [...foundPost.rows, ...lostPost.rows];
        res.status(200).json(allPost);
    } catch (err) {
        next(err)
    }
}