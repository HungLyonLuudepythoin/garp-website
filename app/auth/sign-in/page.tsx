import { redirect } from "next/navigation"
import SignInPage from "./signin"
import { getUserRole } from "@/app/lib/auth/getUserRoleServerAction";
import React from "react";

const SignIn: React.FC = async () => {
  const isAuthenticated = false; // Example
  const role = await getUserRole(); 
  if (isAuthenticated && role !== "ADMIN") {
    redirect("/dashboard")
  } else if (isAuthenticated && role === "ADMIN") {
    redirect("/admin")
  } else {
    return <SignInPage/>
  }
}

export default SignIn