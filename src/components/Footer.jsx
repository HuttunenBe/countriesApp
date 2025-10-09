"use client";

import { Box, Typography, Button, useTheme, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 6,
        mt: 8,
        backgroundColor: theme.palette.mode === "dark" ? "#000d08" : "#008080",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          onClick={() => router.push("/")}
          sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
        >
          Home
        </Button>
        <Button
          onClick={() => router.push("/countries")}
          sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
        >
          Countries
        </Button>
        <Button
          onClick={() => router.push("/example")}
          sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
        >
          Example
        </Button>
        <Button
          onClick={() => router.push("/protected")}
          sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
        >
          Protected
        </Button>

        {user ? (
          <>
            <Button
              onClick={() => router.push("/profile")}
              sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
            >
              Profile
            </Button>
            <Button
              onClick={signOut}
              sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            sx={{ color: "white", textTransform: "none", fontSize: "1.1rem" }}
          >
            Login
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mb: 4,
        }}
      >
        <Paper
          sx={{
            p: 3,
            minWidth: 200,
            maxWidth: 250,
            backgroundColor: theme.palette.mode === "dark" ? "#111" : "#00b3a6",
            color: "white",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={1}>
            🌍 Explore Countries
          </Typography>
          <Typography variant="body2">
            Discover all countries in the world, their capitals, population and
            regions
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            minWidth: 200,
            maxWidth: 250,
            backgroundColor: theme.palette.mode === "dark" ? "#111" : "#00b3a6",
            color: "white",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={1}>
            🇺🇳 Learn Flags
          </Typography>
          <Typography variant="body2">
            View each country's flag and learn about its symbolism and history
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            minWidth: 200,
            maxWidth: 250,
            backgroundColor: theme.palette.mode === "dark" ? "#111" : "#00b3a6",
            color: "white",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={1}>
            📊 Stay Informed
          </Typography>
          <Typography variant="body2">
            Access quick facts like population, region and other country
            statistics
          </Typography>
        </Paper>
      </Box>

      <Typography
        variant="body2"
        sx={{ textAlign: "center", mb: 2, color: "white" }}
      >
        Explore the world, learn about countries, flags and cultures. Made with
        ❤️ for curious minds
      </Typography>
    </Box>
  );
}
