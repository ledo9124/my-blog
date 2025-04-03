import mongoose from "mongoose";

const connection: { isConnected?: number } = {}

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const url = process.env.MONGODB_URI || '';

  const db = await mongoose.connect(url);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;