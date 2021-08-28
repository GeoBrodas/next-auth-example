import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://high_level_agent:rU5lJ4vFUfR7JR1d@cluster0.3svps.mongodb.net/users?retryWrites=true&w=majority'
  );

  return client;
}
