# Product List Management App

This project is a full-stack application for managing a Product List, featuring a RESTful API backend (Node.js, TypeScript, in-memory MongoDB) and a React frontend with a custom Tooltip component.

---

## Getting Started

### 1. Install Dependencies

From the project root, install dependencies for both backend and frontend:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start the Application

You can start both the backend and frontend in separate terminals:

**Backend:**
```bash
cd backend
npm run dev
```
The backend will run at [http://localhost:3000](http://localhost:3000)

**Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run at [http://localhost:5173](http://localhost:5173)

---

## Database

- The backend uses an **in-memory MongoDB database** (via `mongodb-memory-server`).
- The database starts empty every time you restart the backend server.

---

## Creating Products

- You can create products using the API documentation provided by Swagger.
- Visit [http://localhost:3000/docs](http://localhost:3000/docs) after starting the backend.
- Use the `POST /products` endpoint to add new products.

---

## Notes
- The frontend fetches and displays products from the backend.
- The Tooltip component shows the product description on hover or focus.
- You must create products (using Swagger or the API) before they will appear in the frontend.

---

## Why soft-deleting?
- It would be perhaps slightly easier to implement a hard delete using the appropriate api on Mongoose. However, this is an opportunity to note that in a real environment there should always be made an effort to preserve history. This can be achieved via a soft delete as implemented here or by any other appropriate means, such as on delete triggering a process that would save some sort of log of the record for audit purposes.

---

## What else could I have done?
In the interest of brevity and to keep within the scope of the assignment, some features that would otherwise be expected have been left out, such as:
- Auth, even if just a username and password saved in the in-memory database for the purpose of demonstrating a signup and signin process.
- A form to add products to the database. It is assumed that the lack of this is compensated by testing the backend via the Swagger documentation provided.
- Starting by designing the OpenAPI spec, so that a shared types library could be generated from it, and used by both the backend and the frontend to establish the contract between both. I didn't want to overcomplicate the implementation, but in the past I have done this using Zod in a monorepo.
