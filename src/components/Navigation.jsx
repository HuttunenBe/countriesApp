"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navigation = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          {user ? (
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          ) : (
           <Button
  color="inherit"
  onClick={() => router.push("/login")} // navigate to login page
>
  Login
</Button>

          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Navigation;
