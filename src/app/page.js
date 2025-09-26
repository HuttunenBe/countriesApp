"use client";

import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, session } = useAuth();

  console.log("User data: ", user);
  console.log("Session: ", session);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      App will be here
    </div>
  );
}
