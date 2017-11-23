import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import auth from './routes/auth';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB, { useMongoClient: true });

app.use('/api', auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on port 8080'));
