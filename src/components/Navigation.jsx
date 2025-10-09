"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Toolbar, Button, useTheme } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

const Navigation = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();

  const { user, signOut } = useAuth();

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          mb: 3,
          backgroundColor: theme.palette.mode === "dark" ? "#000d08" : "teal",
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <ThemeToggle />

          <Button
            color="inherit"
            onClick={() => router.push("/")}
            sx={{ fontSize: "1rem", textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push("/countries")}
            sx={{ fontSize: "1rem", textTransform: "none" }}
          >
            Countries
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push("/example")}
            sx={{ fontSize: "1rem", textTransform: "none" }}
          >
            Example
          </Button>
          <Button
            color="inherit"
            onClick={() => router.push("/protected")}
            sx={{ fontSize: "1rem", textTransform: "none" }}
          >
            Protected
          </Button>

          {user && (
            <Button
              color="inherit"
              onClick={() => router.push("/profile")}
              sx={{ fontSize: "1rem", textTransform: "none" }}
            >
              Profile
            </Button>
          )}

          {user ? (
            <Button
              color="inherit"
              onClick={signOut}
              sx={{ fontSize: "1rem", textTransform: "none" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => router.push("/login")}
              sx={{ fontSize: "1rem", textTransform: "none" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
        <img
          src="/Logo.svg"
          alt="Logo"
          style={{ height: 40 }}
          onClick={() => router.push("/")}
        />
      </AppBar>

      {children}
    </div>
  );
};

export default Navigation;
