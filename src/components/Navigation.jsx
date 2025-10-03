// This file should run only on the client side
"use client";

// Import the router hook to programmatically navigate between pages
// import { useState, useEffect } from "react"; // commented out, not used
import { useRouter } from "next/navigation";

// Import custom authentication context to get user info and sign-out function
import { useAuth } from "@/app/context/AuthContext";

// Import Material-UI components for the navigation bar
import { AppBar, Toolbar, Button } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

// Define the Navigation component that can wrap other components (children)
const Navigation = ({ children }) => {
  // Get the router object so we can programmatically navigate
  const router = useRouter();

  // Get the current user and the signOut function from the auth context
  const { user, signOut } = useAuth();

  /*
  // This was previously used to prevent hydration errors in Next.js
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  */

  // Return the JSX for the navigation bar and the wrapped content
  return (
    <div>
    <div>
      {/* AppBar is the top navigation bar, position static to stay at the top */}
      <AppBar position="static" sx={{ mb: 3 }}> {/* mb: 3 adds margin bottom */}
        {/* Toolbar organizes the buttons horizontally */}
        <Toolbar>
          {/* Button to navigate to /countries page */}
          <Button color="inherit" onClick={() => router.push("/countries")}>
            Countries
          </Button>

          {/* Button to navigate to /example page */}
          <Button color="inherit" onClick={() => router.push("/example")}>
            Example
          </Button>

<ThemeToggle/>
          {/* Button to navigate to /protected page */}
          <Button color="inherit" onClick={() => router.push("/protected")}>
            Protected
          </Button>

          {/* Conditional rendering: show Logout if user is logged in, else Login */}
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

      {/* Render any child components passed to Navigation */}
      {children}
    </div></div>
  );
};

// Export the component so it can be used in other parts of the app
export default Navigation;
