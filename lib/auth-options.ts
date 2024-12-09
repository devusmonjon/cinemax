import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongoose";
import User from "@/database/user.model";
import { randomPasswordGenerator } from "./utils";
import { transporter } from "./mail";
import { compare, hash } from "bcrypt";

interface SessionUser {
  email: string;
  username: string;
  fullName: string;
  image: string;
  verifyied: boolean;
  _id: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
  updatedAt: Date;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ username: credentials?.username });

        if (user) {
          const isPasswordValid = await compare(
            credentials?.password || "",
            user.password
          );

          if (isPasswordValid) {
            console.log(user);

            if (!user?.verified) return null;

            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDatabase();
      const isExistingUser = await User.findOne({
        email: session.user?.email,
      });

      if (!isExistingUser) {
        const password = randomPasswordGenerator(12);
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({
          email: session.user?.email,
          username: session.user?.email,
          fullName: session.user?.name,
          image: session.user?.image,
          password: hashedPassword,
          verifyied: true,
        });

        const mail = await transporter.sendMail({
          from: process.env.MAIL_USER!,
          to: session.user?.email || "",
          subject: "Welcome to CineMax!",
          html: `
          <div style="text-align: center;">
            <h1 style="color: #333;">Welcome to CineMax!</h1>
            <p style="font-size: 18px;">Hi ${session.user?.name},</p>
            <p style="font-size: 18px;">Welcome to CineMax! We're excited to have you join our community.</p>
            <p style="font-size: 18px;">Your username: ${session.user?.email}</p>
            <p style="font-size: 18px;">Your password: ${password}</p>
            <p style="font-size: 18px;">Please log in to your account to start exploring our platform.</p>
            <p style="font-size: 18px;">Best regards,<br>The CineMax Team</p>
          </div>
        `,
        });

        console.log(mail);
        session.user = {
          email: newUser?.email,
          username: newUser?.email,
          fullName: newUser?.fullName,
          image: newUser?.image,
          verifyied: newUser?.verified,
          _id: newUser?._id,
          role: newUser?.role,
          createdAt: newUser?.createdAt,
          updatedAt: newUser?.updatedAt,
        } as SessionUser;
      }
      session.user = {
        email: isExistingUser?.email,
        username: isExistingUser?.email,
        fullName: isExistingUser?.fullName,
        image: isExistingUser?.image,
        verifyied: isExistingUser?.verified,
        _id: isExistingUser?._id,
        role: isExistingUser?.role,
        createdAt: isExistingUser?.createdAt,
        updatedAt: isExistingUser?.updatedAt,
      } as SessionUser;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
