import { MongoClient } from 'mongodb';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const collection = process.env.MONGODB_COLLECTION;

const MONGODB_URI = `mongodb+srv://${username}:${password}@${cluster}.3svps.mongodb.net/${collection}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI);

  return client;
}
