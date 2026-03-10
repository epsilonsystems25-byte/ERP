# ERP Super Admin Dashboard

This project contains a **Node.js/Express backend** and a **React (Vite) frontend** that connect to your existing MySQL database (`customers` and `user_auth` tables).

## Project structure

- `backend` – REST API, authentication, and database access
- `frontend` – React SPA with login and super admin dashboard

## Backend

### Environment

Copy `backend/.env.example` to `backend/.env` and set your values:

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` – point to the MySQL instance that already has the `customers` and `user_auth` tables
- `JWT_SECRET` – any strong random string
- `FRONTEND_ORIGIN` – usually `http://localhost:5173` for Vite

### Run backend

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:4000/api`.

Key endpoints:

- `POST /api/auth/login` – login with **email** and **password`** (reads from `user_auth`, joins `customers` to get `role`)
- `GET /api/customers` – list customers (optional `status` and `search` query params)
- `POST /api/customers` – create customer
- `PUT /api/customers/:id` – update customer
- `DELETE /api/customers/:id` – delete customer

All `/api/customers` routes require a valid JWT token with `role = super_admin`.

## Frontend

### Environment

Copy `frontend/.env.example` to `frontend/.env` and adjust the API base URL if needed.

### Run frontend

```bash
cd frontend
npm run dev
```

By default, Vite runs on `http://localhost:5173`.

### UI flow

- Navigate to `/login`
- Login with a user that exists in `user_auth` whose related `customers.role` is `super_admin`
- On success, you are redirected to the **Super Admin Dashboard**, which includes:
  - Top navbar with notification bell and profile avatar
  - Customer management table (search, filter by status, edit/delete actions)
  - “Add New Customer” drawer with the full customer form

