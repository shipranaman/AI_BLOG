import jwt from 'jsonwebtoken'
import db from "../configs/db.js";
const adminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token=jwt.sign({email},process.env.JWT_SECRET)
        res.json({success:true,token})


    }catch(error){
        res.json({success:false,message:error.message})

    }
}
export default adminLogin
export const getAllBlogsAdmin = (req, res) => {

    const sql = `
    SELECT *
    FROM blogs
    ORDER BY created_at DESC
    `;

    db.query(sql, (err, blogs) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            blogs
        });

    });

};
export const getAllComments = (req, res) => {

    const sql = `
    SELECT
        comments.*,
        blogs.title
    FROM comments
    INNER JOIN blogs
        ON comments.blog_id = blogs.id
    ORDER BY comments.created_at DESC
    `;

    db.query(sql, (err, comments) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            comments
        });

    });

};
export const getDashboard = (req, res) => {

    // Recent Blogs
    const recentBlogsSql = `
    SELECT *
    FROM blogs
    ORDER BY created_at DESC
    LIMIT 5
    `;

    db.query(recentBlogsSql, (err, recentBlogs) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        // Total Blogs
        const blogsSql = `
        SELECT COUNT(*) AS blogs
        FROM blogs
        `;

        db.query(blogsSql, (err, blogResult) => {

            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
            }

            // Total Comments
            const commentsSql = `
            SELECT COUNT(*) AS comments
            FROM comments
            `;

            db.query(commentsSql, (err, commentResult) => {

                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }

                // Total Drafts
                const draftsSql = `
                SELECT COUNT(*) AS drafts
                FROM blogs
                WHERE isPublished = FALSE
                `;

                db.query(draftsSql, (err, draftResult) => {

                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }

                    const dashboardData = {
                        blogs: blogResult[0].blogs,
                        comments: commentResult[0].comments,
                        drafts: draftResult[0].drafts,
                        recentBlogs
                    };

                    res.json({
                        success: true,
                        dashboardData
                    });

                });

            });

        });

    });

};
export const deleteCommentById = (req, res) => {

    const { id } = req.body;

    const sql = `
    DELETE FROM comments
    WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.json({
                success: false,
                message: "Comment not found"
            });
        }

        res.json({
            success: true,
            message: "Comment deleted successfully"
        });

    });

};
export const approveCommentById = (req, res) => {

    const { id } = req.body;

    const sql = `
    UPDATE comments
    SET isApproved = TRUE
    WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.json({
                success: false,
                message: "Comment not found"
            });
        }

        res.json({
            success: true,
            message: "Comment approved successfully"
        });

    });

};