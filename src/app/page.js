"use client";

import { useAuth } from "./context/AuthContext";
import { Container, Box, Typography, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, session } = useAuth();
  const router = useRouter();

  console.log("User data: ", user);
  console.log("Session: ", session);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 8,
        gap: 4,
      }}
    >
      <Typography variant="h3" component="h1" color="primary" fontWeight="bold">
        Welcome to World Explorer!
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ maxWidth: 600, mb: 2 }}
      >
        Discover the countries of the world with ease — from their flags and
        capitals to population, region, and more. This app makes exploring
        global information simple and engaging, whether you're curious about a
        specific country or just want to learn more about our planet. Start by
        browsing the list of countries or searching for one to dive deeper into
        its unique details.
      </Typography>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/countries")}
        >
          Explore Countries
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/profile")}
        >
          My Profile
        </Button>
      </div>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Box
          component="img"
          src="https://images.pexels.com/photos/8828421/pexels-photo-8828421.jpeg"
          alt="World map globe"
          sx={{ width: "100%", display: "block" }}
        />
      </Paper>
    </Container>
  );
}
