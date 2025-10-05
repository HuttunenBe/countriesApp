"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Toolbar, Button } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

const Navigation = ({ children }) => {
  const router = useRouter();

  const { user, signOut } = useAuth();

  return (
    <div>
      <AppBar position="static" sx={{ mb: 3 }}>
        {" "}
        <Toolbar>
          <ThemeToggle />

          <Button color="inherit" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push("/countries")}>
            Countries
          </Button>

          <Button color="inherit" onClick={() => router.push("/example")}>
            Example
          </Button>

          <Button color="inherit" onClick={() => router.push("/protected")}>
            Protected
          </Button>
          {user && (
            <Button color="inherit" onClick={() => router.push("/profile")}>
              Profile
            </Button>
          )}
          {user ? (
            <Button color="inherit" onClick={signOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
