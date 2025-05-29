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
