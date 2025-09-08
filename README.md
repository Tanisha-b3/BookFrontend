# Task Management App

A full-stack Task Management Web Application built with **MERN** stack (MongoDB, Express, React/Next.js, Node.js) allowing users to register, log in, and manage their own tasks efficiently.  

---

## Features

- **Authentication**
  - Sign Up and Login with email & password.
  - Passwords are securely hashed using bcrypt.
  - JWT-based authentication for protected routes.
  - Users can only access their own tasks.

- **Task Management (CRUD)**
  - Create, view, update, and delete tasks.
  - Each task includes: title, description, status (Pending/Done), and createdAt.
  - Only the task creator can modify or delete a task.

- **Search, Filter, and Pagination**
  - Search tasks by title or description.
  - Filter tasks by status: All, Pending, Done.
  - Search and filter work together.
  - Pagination implemented for task lists.

- **Frontend**
  - Built with React / Next.js 13+ (App Router optional).
  - Pages: Login/Register, Dashboard (task list), Task Form (create/edit).
  - Clean and minimal UI using TailwindCSS / Shadcn UI.
  - Loading and error states handled gracefully.

- **Bonus / Optional Features**
  - Deployed on Vercel with MongoDB Atlas backend.
  - React Query / SWR for data fetching.
  - Optimistic updates for task actions.

---

## Demo

- **Frontend:** [https://user-frontend-zoss.vercel.app](https://user-frontend-zoss.vercel.app)  
- **Backend API:** [https://user-backend-eta.vercel.app](https://user-backend-eta.vercel.app)  

---

## Installation

### Backend

1. Clone the repository:
   ```bash
    git clone [YOUR_REPO_LINK]
   cd backend
   ```
  npm install
Create a .env file in the backend root and add:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server:

bash
Copy code
npm run dev
Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend root and add:

bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend development server:

For React:

bash
Copy code
npm start
For Next.js:

bash
Copy code
npm run dev
Usage
Register a new account or login with existing credentials.

Create, view, update, or delete tasks from the dashboard.

Use search and filter options to quickly find tasks.

Pagination helps navigate large lists of tasks.

Tech Stack
Frontend: React / Next.js, TailwindCSS / Shadcn UI

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT, bcrypt

Folder Structure
text
Copy code
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── server.js

frontend/
├── pages/
├── components/
├── api/
├── styles/
├── App.jsx
License
This project is for evaluation purposes and does not include a license.

Author
Tanisha Borana
Email: your_email@example.com
GitHub: your_github_profile 
   git clone [YOUR_REPO_LINK]
   cd backend
