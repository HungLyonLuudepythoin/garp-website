import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import { pool } from "@/app/lib/postgres";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { clearStakeTokens } from "./clearStaleTokenServiceAction";
import { setName } from "./setNameServerAction";
export const {handlers, signIn, signOut, auth} = NextAuth({
  trustHost: true,
  adapter: PostgresAdapter(pool),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 *60 * 60, // 60 days
  },
  pages: {
    signIn:"/auth/sign-in",
    verifyRequest:"/auth/auth-success",
    error:"/auth/auth-error"
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    async jwt({token,user,session,trigger}) {
      if (trigger === "update" && session.name !== token.name) {
        token.name = session.name
          await setName(token.name || "")
      }


      await clearStakeTokens();
      if (user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user, 
          id: token.id as string
        }
      }
    }
    
  }
})