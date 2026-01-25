// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MONGODB_URI", MONGODB_URI);
export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  await mongoose.connect(MONGODB_URI);
  await mongoose.connection.db?.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return mongoose;
}

export async function dbDisconnect() {
  await mongoose.disconnect();
}