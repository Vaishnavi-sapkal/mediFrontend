import { Box, Paper, Typography } from "@mui/material";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
} from "@tabler/icons-react";

function Footer() {
  return (
    <Paper
      sx={{
        mt: "1rem",
        backgroundColor: "white",
        width: "100%",
        height: "70px",
        borderRadius: "10px",
      }}
    >
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingRight: "10px",
        }}
      >
        <Typography sx={{ flex: 1, fontWeight: "450" }}>
          &nbsp; &nbsp; © 2025 MediDrop | Sharing health, spreading hope.
        </Typography>

        {/* LinkedIn */}
        <Box>
          <IconBrandLinkedin />
        </Box>

        {/* GitHub */}
        <Box>
          <IconBrandGithub />
        </Box>

        {/* Instagram */}
        <Box>
          <IconBrandInstagram />
        </Box>
      </Box>
    </Paper>
  );
}

export default Footer;
