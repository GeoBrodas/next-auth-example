import { verifyPassword } from '@/helpers/auth';
import { connectToDatabase } from '@/helpers/db';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = await client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Invalid password!');
        }

        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
