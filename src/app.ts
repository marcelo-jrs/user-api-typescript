import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;