// This tells Next.js that this component should be rendered on the client side
"use client";

// Import a custom authentication hook from your app context
import { useAuth } from "./context/AuthContext";

// Define the Home component
export default function Home() {
  // Use the custom hook to get user information and session data
  const { user, session } = useAuth();

  // Log user data to the console for debugging purposes
  console.log("User data: ", user);
  console.log("Session: ", session);

  // Return the JSX that will be rendered on the page
  return (
    <div 
      className="
        font-sans                     // Use a sans-serif font
        grid grid-rows-[20px_1fr_20px] // Create a CSS grid with 3 rows: top 20px, middle flexible, bottom 20px
        items-center                  // Vertically center items in each grid cell
        justify-items-center          // Horizontally center items in each grid cell
        min-h-screen                  // Minimum height is full screen
        p-8                           // Padding of 8 units around the container
        pb-20                         // Extra bottom padding of 20 units
        gap-16                        // Gap of 16 units between grid items
        sm:p-20                       // On small screens or larger, padding becomes 20 units
      "
    >
      {/* This is the main content of the home page */}
      App will be here
    </div>
  );
}
