"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = ({ message = "Loading..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: "1rem" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
