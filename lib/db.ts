import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log(MONGODB_URI, "mongodb uri");
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined on .env");
}

declare global {
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

let cached = global.mongoose as {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((db) => db);
  }

  cached.conn = (await cached.promise).connection;
  return cached.conn;
}

export default dbConnect;
