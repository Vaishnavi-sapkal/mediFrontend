import React from "react";
import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpg";
import about3 from "../../assets/about3.jpg";

function About() {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 7,
        borderRadius: "10px",
        mx: "auto",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#6829adff",
          textAlign: "center",
          mb: 4,
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        About MediDrop
      </Typography>

      {/* Images Section */}
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 4 }}
      >
        {[about1, about2, about3].map((img, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              component="img"
              src={img}
              alt={`MediDrop Image ${index + 1}`}
              sx={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: "14px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* About Text */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.3rem",
          color: "#060606ff",
          lineHeight: "1.7",
          textAlign: "justify",
        }}
      >
        MediDrop is a social platform that connects people who have unused
        medicines with those in need. It helps reduce medicine waste and
        supports underprivileged patients through safe and verified
        redistribution.
      </Typography>

      {/* Mission Section */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 4,
          color: "#6829adff",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        Our Mission
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "1.3rem",
          textAlign: "justify",
          lineHeight: "1.7",
          color: "#000000ff",
        }}
      >
        Our mission is to ensure that no medicine goes unused and every donation
        reaches someone who truly needs it — building a caring and sustainable
        community for all.
      </Typography>

      {/* How It Works */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 4,
          color: "#6829adff",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        How MediDrop Works
      </Typography>

      <Box component="ul" sx={{ pl: 4, mb: 2 }}>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.3rem", color: "#000000ff" }}
          >
            <strong style={{ color: "#6829adff" }}>Donate:</strong> Individuals
            and hospitals donate safe, unopened medicines.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.3rem", color: "#000000ff" }}
          >
            <strong style={{ color: "#6829adff" }}>Collect:</strong> Verified
            centers collect and log all donations.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.3rem", color: "#000000ff" }}
          >
            <strong style={{ color: "#6829adff" }}>Verify:</strong> Medicines
            are checked for quality and expiry before redistribution.
          </Typography>
        </li>
        <li>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.3rem", color: "#000000ff" }}
          >
            <strong style={{ color: "#6829adff" }}>Distribute:</strong> Approved
            medicines are delivered to hospitals and people in need.
          </Typography>
        </li>
      </Box>

      {/* Get Involved */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mt: 4,
          color: "#6829adff",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        Get Involved
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.3rem",
          textAlign: "justify",
          lineHeight: "1.7",
          color: "#090909ff",
        }}
      >
        You can contribute by donating medicines, volunteering at collection
        drives, or spreading awareness. Together, let’s make healthcare
        accessible for all and eliminate medicine wastage.
      </Typography>
    </Paper>
  );
}

export default About;
