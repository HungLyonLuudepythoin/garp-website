"use server";

import { signIn } from "./authConfig";

export const handleGoogleSignIn = async () => {
  await signIn("google", {redirectTo: "/dashboard"})
}