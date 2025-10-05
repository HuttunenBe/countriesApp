import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 3,
        mt: 8,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} World Explorer. All rights reserved.
      </Typography>
    </Box>
  );
}
