// Importing components from Material-UI library to build tables
import {
  Paper,          // A container component that gives a background paper-like effect
  Table,          // The main table component
  TableBody,      // Component to wrap the table rows containing data
  TableCell,      // Component for each cell in a row
  TableContainer, // Wrapper for table, often used with Paper for styling
  TableHead,      // Component for table header row
  TableRow,       // Component for a row in the table
} from "@mui/material";

// This is a functional React component that renders a table dynamically
export const DynamicTable = ({ data }) => {
  // If there is no data, return nothing (so no empty table is rendered)
  if (!data.length) return null;

  // Get the table headers by taking the keys from the first object in the data array
  const headers = Object.keys(data[0]);

  // A helper function to format the value inside each table cell
  const formatValue = (value) => {
    // If value is null or undefined, display a dash
    if (value === null || value === undefined) return "-";

    // If value is a Date object, convert it to a readable string
    if (value instanceof Date) return value.toLocaleString();

    // If value is boolean, show "Yes" for true and "No" for false
    if (typeof value === "boolean") return value ? "Yes" : "No";

    // For any other type (string, number, etc.), convert it to string
    return String(value);
  };

  // Return the JSX to render the table
  return (
    // Wrap the table inside Paper for nice styling and TableContainer for scroll/spacing
    <TableContainer component={Paper}>
      <Table>
        {/* Render the table header */}
        <TableHead>
          <TableRow>
            {/* Loop through all headers and create a TableCell for each */}
            {headers.map((header) => (
              <TableCell key={header}>
                {/* Capitalize first letter and replace underscores with spaces */}
                {header.charAt(0).toUpperCase() +
                  header.slice(1).replace(/_/g, " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Render the table body */}
        <TableBody>
          {/* Loop through each row of data */}
          {data.map((row, index) => (
            <TableRow key={index}>
              {/* Loop through each header to ensure consistent column order */}
              {headers.map((header) => (
                <TableCell key={`${index}-${header}`}>
                  {/* Format the cell value using the helper function */}
                  {formatValue(row[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
