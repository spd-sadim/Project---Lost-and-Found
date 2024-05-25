import pool from "../db.js";

export const getPosts = async(req, res, next)=>{
    const { category, status, date, location, keywords } = req.query;

    let query = 'SELECT * FROM lost_posts WHERE 1 = 1'; // Base query for lost posts

    if (category) query += ` AND category = '${category}'`;
    if (status) query += ` AND status = '${status}'`;
    if (date) query += ` AND date = '${date}'`;
    if (location) query += ` AND location ILIKE '%${location}%'`;
    if (keywords) query += ` AND description ILIKE '%${keywords}%'`;

    try {
        res.send(req.query)
        const lostPosts = await pool.query(query);
        
        // Repeat the process for found posts and merge the results
        // (Alternatively, UNION ALL can be used if both tables have the same structure)
        const foundPostsQuery = query.replace('lost_posts', 'found_posts');
        const foundPosts = await pool.query(foundPostsQuery);

        const allPosts = [...lostPosts.rows, ...foundPosts.rows];
        res.json(allPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
       next(error)
    }
}


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