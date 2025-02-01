import { redirect } from "next/navigation";
import { DashboardPage } from "./dashboard"
import { checkIsAuthenticated } from "../lib/auth/checkIsAuthenticated";
import React from "react";

const Dashboard: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated()
  if (!isAuthenticated) {
    redirect("auth/sign-in")
  } else {
  return <div className="">
    <DashboardPage/>
  </div>
  }
}
export default Dashboard