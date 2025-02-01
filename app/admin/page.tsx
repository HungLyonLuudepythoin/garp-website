
import { redirect } from "next/navigation"
import { getUserRole } from "../lib/auth/getUserRoleServerAction"
import Adminpage from "./adminPage";
import React from "react";
const AdminPage: React.FC = async () => {
  const role = await getUserRole(); // Fetch the user role on the server

  if (role !== "ADMIN") {
    redirect("/dashboard"); // Redirect if not an admin
  }

  return <Adminpage />; // Render the client-side component if role is ADMIN
}


export default AdminPage