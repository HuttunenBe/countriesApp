"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import AuthRedirect from "../login/AuthRedirect";

const Protected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return <AuthRedirect />;

  return <Typography variant="h1">Protected Content</Typography>;
};

export default Protected;
