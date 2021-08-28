import { hashPassword } from '@/helpers/auth';
import { connectToDatabase } from '@/helpers/db';

async function handler(req, res) {
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid Input - password has to be atleast 7 characters long!',
    });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const client = await connectToDatabase();

  const db = client.db();
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created User!!', result });
}

export default handler;
