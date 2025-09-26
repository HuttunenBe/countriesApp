// Mark this component as a client-side component in Next.js
"use client"; // This directive tells Next.js that this component will run entirely on the client side (browser), allowing hooks like useState/useEffect

// Import the async thunk to fetch countries from Redux slice
import { fetchCountries } from "@/lib/features/countries/countriesSlice"; // Import the fetchCountries action from the Redux slice, which handles async API calls

// Import React hooks
import { useEffect } from "react"; // Import useEffect to run side effects in the component (e.g., fetching data on mount)

// Import Redux hooks for state and dispatch
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions and useSelector to access Redux state

// Import Material-UI components for styling
import { Card, CardContent, Typography, Box } from "@mui/material"; // Import UI components: Card, CardContent, Typography for text, and Box for layout
import { useRouter } from "next/navigation"; // Import Next.js router hook to navigate programmatically
import { CardActionArea } from "@mui/material"; // Import CardActionArea to make the entire Card clickable

const Countries = () => { // Declare the functional component Countries
  // Access the 'countries' array from Redux state
  const countries = useSelector((state) => state.countries.countries); 
  // useSelector reads the 'countries' array from Redux state at state.countries.countries

  // Get dispatch function to trigger Redux actions
  const dispatch = useDispatch(); // Get the dispatch function to dispatch Redux actions
  const router = useRouter(); // Get Next.js router instance to navigate programmatically

  const handleCountryClick = (countryName) => { // Function to handle when a country card is clicked
    // Create URL-friendly slug
    const slug = countryName.toLowerCase().replace(/\s+/g, "-"); 
    // Convert country name to lowercase and replace spaces with hyphens to create a URL-friendly slug

    router.push(`/countries/${encodeURIComponent(slug)}`); 
    // Navigate to the dynamic country page using the slug, encodeURIComponent ensures special characters are URL-safe
  };

  // useEffect runs once on mount to fetch countries from API
  useEffect(() => { // Run this effect once when component mounts
    dispatch(fetchCountries()); // Dispatch the async thunk to fetch countries from the API and store in Redux
  }, [dispatch]); // Dependency array contains dispatch, so effect runs only once

  // Log countries array for debugging
  console.log("countries", countries); // Print countries array in console to verify fetched data

  return (
    // Box container for layout, using flex and wrapping items
    <Box display="flex" flexWrap="wrap" padding="2rem"> 
    {/* Box component as a flex container with wrapping and padding */}
      {countries.map((country) => ( 
      // Map over the countries array to render a Card for each country
        // Each country is displayed as a Material-UI Card
        <Card
          key={country.cca3 || country.ccn3 || country.name.common} 
          // Use unique identifier for each card: cca3 or ccn3 or name as fallback
          style={{
            margin: "10px", // Space around each card
            padding: "10px", // Inner padding inside the card
            width: 250, // Fixed width for each card
            lineHeight: 1.5, // Line height for text readability
          }}
        >
          {" "} 
          <CardActionArea
            onClick={() => handleCountryClick(country.name.common)} 
            // Make entire card clickable; clicking calls handleCountryClick with country name
          >
            <CardContent>{/* Your existing card content */}</CardContent>
            {/* Empty CardContent for spacing; can be used for future content */}

            <CardContent>
              {/* Country name */}
              <Typography
                variant="h2" // Use h2 typography variant
                style={{ fontSize: "29px", fontWeight: 900 }} 
                // Custom style: larger font size and bold weight
              >
                {country.name.common} 
                {/* Display country name from API data */}
              </Typography>

              {/* Country population */}
              <Typography>{country.population}</Typography> 
              {/* Display country population */}

              {/* Country currencies */}
              <Typography>
                {country.currencies
                  ? Object.values(country.currencies).map(
                      (country) => country.name
                    ) 
                  : ""} 
                {/* If country has currencies, map over them and display names; otherwise display empty string */}
              </Typography>

              {/* Country flag */}
              <Typography>
                <img
                  src={country.flags?.svg} // Display country flag image using SVG URL
                  alt={country.flag?.alt} // Alt text for accessibility
                  style={{ height: "auto", width: 100, marginTop: 20 }} 
                  // Set image width to 100px, height auto to maintain aspect ratio, and top margin
                />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

// Export Countries component for use in routes or other components
export default Countries; // Export component so it can be imported in pages or other components
