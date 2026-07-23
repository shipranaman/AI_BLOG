console.log("BLOG CONTROLLER LOADED");
import fs from "fs";
import Imagekit from "../configs/imageKit.js";
import db from "../configs/db.js";
import generateContent from "../configs/gemini.js";

export const addBlog = async (req, res) => {
    try {

        const {
            title,
            subTitle,
            description,
            category,
            isPublished
        } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Missing required fields"
            });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to ImageKit
        const response = await Imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimized Image URL
        const optimizedImageUrl = Imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: "1280" }
            ]
        });

        const image = optimizedImageUrl;

        const sql = `
        INSERT INTO blogs
        (title, subTitle, description, category, image, isPublished)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                title,
                subTitle,
                description,
                category,
                image,
                isPublished
            ],
            (err, result) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    message: "Blog added successfully"
                });
            }
        );

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
export const getAllBlogs = (req, res) => {

    const sql = "SELECT * FROM blogs WHERE isPublished = ? ORDER BY created_at DESC";

    db.query(sql, [true], (err, blogs) => {

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

export const getBlogById = (req, res) => {

    const { blogId } = req.params;

    const sql = "SELECT * FROM blogs WHERE id = ?";

    db.query(sql, [blogId], (err, result) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            blog: result[0]
        });
});

};
export const deleteBlogById = (req, res) => {

    const { id } = req.body;

    const sql = "DELETE FROM blogs WHERE id = ?";

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
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog deleted successfully"
        });
 });

};

export const togglePublish = (req, res) => {

    const { id } = req.body;

    const getSql = `
    SELECT isPublished
    FROM blogs
    WHERE id = ?
    `;

    db.query(getSql, [id], (err, result) => {

        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }

        const newStatus = !result[0].isPublished;

        const updateSql = `
        UPDATE blogs
        SET isPublished = ?
        WHERE id = ?
        `;

        db.query(updateSql, [newStatus, id], (err) => {

            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Blog status updated"
            });

        });

    });

};
export const addComment = (req, res) => {

    const { blog, name, content } = req.body;

    const sql = `
    INSERT INTO comments
    (blog_id, name, content)
    VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [blog, name, content],
        (err, result) => {

            if (err) {
                return res.json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Comment added for review"
            });

        }
    );

};
export const getBlogComments = (req, res) => {

    const { blogId } = req.body;

    const sql = `
    SELECT *
    FROM comments
    WHERE blog_id = ?
    AND isApproved = ?
    ORDER BY created_at DESC
    `;

    db.query(sql, [blogId, true], (err, comments) => {

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
export const generateContentAI = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await generateContent(
      prompt +
      "\n\nGenerate a complete blog in simple text format with a title, subtitle and detailed content."
    );
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const rewriteContent = async (req, res) => {
  try {

    const { content, style } = req.body;

    const prompt = `
Rewrite the following blog in a ${style} tone.

Rules:
- Keep the meaning same.
- Do not remove important information.
- Improve readability.
- Return only the rewritten blog.

Blog:

${content}
`;

    const rewrittenContent = await generateContent(prompt);

    res.json({
      success: true,
      content: rewrittenContent,
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message,
    });

  }
};
