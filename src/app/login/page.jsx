// This file should run only on the client side
"use client";

// Import the Supabase client instance
import { supabase } from "@/lib/supabase/supabase";

// Import Material-UI components for layout and styling
import { Box, Paper, Typography } from "@mui/material";

// Import Supabase UI components for authentication
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// Import the custom authentication hook
import { useAuth } from "../context/AuthContext";

// Import component that handles redirecting authenticated users
import AuthRedirect from "./AuthRedirect";

// Define the Login page component
const Login = () => {
  // Get the current user from the auth context
  const { user } = useAuth();

  // Log the user to the console for debugging
  console.log("User: ", user);

  // If the user is already logged in, redirect them
  if (user) {
    return <AuthRedirect />;
  } else {
    // If the user is not logged in, show the login form
    return (
      <Box
        sx={{
          display: "flex",            // Use flexbox layout
          justifyContent: "center",   // Center horizontally
          alignItems: "center",       // Center vertically
          minHeight: "100vh",         // Take full viewport height
          p: 3,                       // Padding around the box
        }}
      >
        {/* Paper provides a card-like container */}
        <Paper
          elevation={3}               // Shadow depth
          sx={{
            p: 4,                     // Padding inside the paper
            maxWidth: 400,            // Maximum width of the login card
            width: "100%",            // Full width if smaller than maxWidth
          }}
        >
          {/* Welcome text */}
          <Typography variant="h5" gutterBottom textAlign="center">
            Welcome
          </Typography>

          {/* Supabase Auth UI component */}
          <Auth
            supabaseClient={supabase}  // Pass the Supabase client
            appearance={{
              theme: ThemeSupa,       // Prebuilt Supabase theme
              variables: {
                default: {
                  colors: {
                    brand: "#1976d2",       // Brand color
                    brandAccent: "#1565c0", // Accent color
                  },
                },
              },
            }}
            providers={["google"]}     // Enable social login with Google
            socialLayout="horizontal"   // Layout of social buttons
            view="sign_in"              // Show sign-in view
          />
        </Paper>
      </Box>
    );
  }
};

// Export the component so it can be used as a page
export default Login;
