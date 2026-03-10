import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'ERP Backend API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});

