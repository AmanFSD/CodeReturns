import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#355E92",
        color: "white",
        textAlign: "center",
        padding: "10px",
        marginTop: "auto",
      }}
    >
      <Typography>ALL RIGHTS RESERVED BY KAZ CODE</Typography>
    </Box>
  );
};

export default Footer;