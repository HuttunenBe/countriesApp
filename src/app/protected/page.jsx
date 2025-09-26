// This file runs only on the client side
"use client";

// Import Material-UI components
import { Box, CircularProgress, Typography } from "@mui/material";

// Import the custom authentication hook
import { useAuth } from "../context/AuthContext";

// Import a component that handles redirecting unauthenticated users
import AuthRedirect from "../login/AuthRedirect";
import Image from "next/image";

// Define the Protected page component
const Protected = () => {
  // Get the current user and loading state from the auth context
  const { user, loading } = useAuth();

  // If authentication is still loading, show a loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex", // Use flexbox for layout
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          height: "100vh", // Make box full viewport height
        }}
      >
        {/* Material-UI circular loading spinner */}
        <CircularProgress />
      </Box>
    );
  }

  // If user is not logged in, redirect them to login page
  if (!user) return <AuthRedirect />;

  // If user is logged in, show the protected content
  return (
    <Box sx={{maxWidth: 1200, mx: 'auto', p: 3}}>
      <Typography variant="h1">Protected - User Data</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Typography variant="body1">{user.name}</Typography>
      <Typography variant="body1"> {user.id}</Typography>
      <Typography variant="body1"> {user.user_metadata.name}</Typography>
      <Image
        src={user.user_metadata.avatar_url}
        alt="User Avatar"
        width={100}
        height={100}
          style={{
      borderRadius: "50%", 
      marginTop: "2rem",   
    }}
      />
    </Box>
  );
};

// Export the component so it can be used as a page
export default Protected;
