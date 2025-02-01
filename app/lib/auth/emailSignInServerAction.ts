"use server";
import { signIn } from "./authConfig";

export const handleEmailSignIn = async (email: string) => {
   await signIn("nodemailer", {email, redirectTo : "/dashboard"})
}