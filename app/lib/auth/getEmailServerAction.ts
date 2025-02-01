"use server";

import { auth } from "./authConfig";

export const getEmail = async () => {
  try {
    const session = await auth();
    if (session && session.user) {
      return session.user.email;
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Failed to retrieve user email:", error);
    throw new Error("Unable to get user email");
  }
};