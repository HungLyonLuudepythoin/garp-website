"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

const Signinbutton = (props: { children?: React.ReactNode; className?: string }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <div>
      <button className={props.className} onClick={handleClick}>
        {props.children || "Sign In"}
      </button>
    </div>
  );
};

export default Signinbutton;
