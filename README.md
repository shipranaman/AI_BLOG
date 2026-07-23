#  AI Blog Platform

A full-stack AI-powered blog platform built using the MERN-inspired architecture with **React, Node.js, Express, MySQL, ImageKit, and Google Gemini AI**. The platform allows administrators to create, manage, and publish blogs while leveraging AI to generate and rewrite blog content.

---

##  Features

### User Features

- Browse published blogs
- Search blogs by title
- Filter blogs by category
- Read blog details
- Add comments on blogs
- Responsive UI

### Admin Features

- Secure admin authentication
- Add new blogs
- Upload blog thumbnails
- Publish/Unpublish blogs
- Delete blogs
- Manage comments
- Dashboard with blog statistics

###  AI Features

- **AI Blog Content Generator**
  - Generate complete blog content from a blog title using Google Gemini AI.

- **AI Blog Rewriter**
  - Rewrite blog content in different writing styles:
    - Professional
    - Casual
    - Formal
    - Beginner Friendly

---

##  Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MySQL

### AI

- Google Gemini API

### Image Storage

- ImageKit

---

##  Project Structure

```
AI_BLOG
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   ├── configs
│   ├── package.json
│   └── server.js
│
└── README.md
```

---


## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```
PORT=

MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

GEMINI_API_KEY=


Project screenshots are available in the **`screenshots`** folder.

- Home Page
- Blog Details
- Admin Dashboard
- Add Blog
- AI Content Generation
- AI Content Rewriter





