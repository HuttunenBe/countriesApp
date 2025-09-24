// Define an async GET request handler
export async function GET(request) {

    // Convert the keys of the `request` object into a string
    // Object.keys(request) returns an array of all top-level properties of the request
    // Using template literal `${}` converts the array into a string
    return new Response(`${Object.keys(request)}`, { status: 200 });
}
