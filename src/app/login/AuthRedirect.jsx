// Import the router hook to navigate programmatically in Next.js
import { useRouter } from "next/navigation";

// Import useEffect hook from React to perform side effects
import { useEffect } from "react";

// Import the custom authentication hook to get user info
import { useAuth } from "../context/AuthContext";

// Define the AuthRedirect component
const AuthRedirect = () => {
  // Get the current user from the auth context
  const { user } = useAuth();

  // Get the router object so we can navigate programmatically
  const router = useRouter();

  // useEffect runs after the component renders
  useEffect(() => {
    // If a user is logged in, redirect them to the protected page
    if (user) {
      router.push("/protected");
    }
  }, [user, router]); // Re-run this effect whenever 'user' or 'router' changes

  // Return nothing since this component only redirects
  return null;
};

// Export the component so it can be used elsewhere
export default AuthRedirect;
