"use server"
import NextAuth from 'next-auth';
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import GitHubProvider from 'next-auth/providers/github';

const authOptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user user:email',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'github') {
        // Ensure MongoDB connection
        await mongoose.connect('mongodb://127.0.0.1:27017/chai', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        // Extract the email from the profile or emails array
        const email = profile.email || profile.email?.find(email => email.primary)?.email;

        if (!email) {
          return false; // Deny access if no email is found
        }

        // Find the user in the database
        let currUser = await User.findOne({ email });

        if (!currUser) {
          // If user does not exist, create a new user
          const newUser = new User({
            email,
            username: email.split('@')[0],
          });

          await newUser.save();
          
        }

        return true; // Allow sign-in
      }

      return true; // Allow other providers
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email:session.user.email});

      session.user.username = dbUser.username;
      return session;
    }

  },
});

export { authOptions as GET, authOptions as POST };
