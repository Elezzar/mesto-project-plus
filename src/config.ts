import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'some-secret-key';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mestodb';
