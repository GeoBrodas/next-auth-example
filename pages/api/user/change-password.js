import { hashPassword, verifyPassword } from '@/helpers/auth';
import { connectToDatabase } from '@/helpers/db';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Invalid request method' });
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not Authenticated' });
    return;
  } // basic code-block for checking un-authorized access!

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db().collection('users');

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found in database' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const isPasswordEqual = await verifyPassword(oldPassword, currentPassword);

  if (!isPasswordEqual) {
    res.status(403).json({
      message: 'Password not matching / or not authorised, try again!',
    });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const changedPasswordResult = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;
