import express from 'express';
import http from 'http';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());

app.use('/api/v1', routes);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Mongodb connected');
  server.listen(port, () => { console.log(`Server is running port ${port}`); });
}
).catch((err) => {
  console.log({ err });
  process.exit(1);
});

