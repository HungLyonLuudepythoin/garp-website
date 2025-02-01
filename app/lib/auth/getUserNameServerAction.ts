"use server";

import { auth } from "./authConfig";

export const getUserName = async () => {
  try {
    const session = await auth();
    if (session && session.user) {
      return session.user.name;
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Failed to retrieve user name:", error);
    throw new Error("Unable to get user name");
  }
};