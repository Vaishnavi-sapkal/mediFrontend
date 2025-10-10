import React from "react";
import { Typography, Container, TextField, Button } from "@mui/material";

function Contact() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <TextField fullWidth label="Your Name" sx={{ mb: 2 }} />
      <TextField fullWidth label="Your Email" sx={{ mb: 2 }} />
      <TextField fullWidth label="Message" multiline rows={4} sx={{ mb: 2 }} />
      <Button variant="contained" color="primary">
        Send
      </Button>
    </Container>
  );
}

export default Contact;
