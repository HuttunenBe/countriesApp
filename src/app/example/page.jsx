// Import the DynamicTable component which renders a table from an array of objects
import { DynamicTable } from "@/components/DynamicTable";

// Create a data array with multiple objects, demonstrating different data types
const data = [
  {
    name: "John",                // String
    age: 30,                      // Number
    city: "New York",             // String
    isStudent: true,              // Boolean
    date: new Date(),             // Date object
    wentToSchool: true,           // Boolean
    personality: "introverted",   // String
  },
  {
    name: "Jane",
    age: 25,
    city: "Los Angeles",
    isStudent: false,
    date: new Date(),
  },
  {
    name: "Jim",
    age: 35,
    city: "Chicago",
    isStudent: true,
    date: new Date(),
  },
];

// Define the Example component
const Example = () => {
  return (
    <div>
      {/* Render the DynamicTable component and pass in the data array */}
      <DynamicTable data={data} />
    </div>
  );
};

// Export the Example component so it can be used as a page or imported elsewhere
export default Example;
