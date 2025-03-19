import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials: any) {

            const email = credentials?.username;
            console.log("credentials", credentials)

            const user: any = await prisma.user.findFirst({where: {email: email}});

            console.log(user)

            const passwordMatch = await bcrypt.compare(credentials?.password, user?.password);

            const {password, ...userData} = user;

            if (passwordMatch) return userData;
            
            console.log("user", user)
            return null;
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }