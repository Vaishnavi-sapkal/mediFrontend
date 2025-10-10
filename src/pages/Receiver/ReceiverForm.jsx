import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReceiverForm() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [formData, setformData] = useState({
    userName: "",
    shopName: "",
    address: "",
    contact: "",
    email: "",
    licenseNumber: "",
  });

  let handleInputChange = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required";
    }
    if (!formData.shopName.trim()) {
      newErrors.shopName = "shop name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "address is required";
    }
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit contact number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }
    if (
      !formData.licenseNumber ||
      !/^MMC\/\d{5,7}$/.test(formData.licenseNumber)
    ) {
      newErrors.licenseNumber = "Enter valid license Number (e.g., MMC/12345)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = axios.post("http://localhost:5000/registerNGO", {
        userName: formData.userName,
        shopName: formData.shopName,
        address: formData.address,
        contact: formData.contact,
        email: formData.email,
        licenseNumber: formData.licenseNumber,
      });

      navigate("/medicines");
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      width={"80vh"}
      p={2}
    >
      <Paper elevation={2} sx={{ p: 4, width: "100%", borderRadius: "10px" }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginBottom: "50px", fontWeight: 500 }}
        >
          Signup Form
        </Typography>

        {/* Basic Information */}

        <Grid container spacing={3}>
          {/* NGO Name full width */}
          <Grid item xs={6} >
            <TextField
              label="Shop Name "
              value={formData.shopName}
              name="shopName"
              onChange={handleInputChange}
              error={!!errors.shopName}
              helperText={errors.shopName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              label="Owner Name "
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              error={!!errors.userName}
              helperText={errors.userName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="number"
              label="Contact Number "
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              error={!!errors.contact}
              helperText={errors.contact}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="number"
              label="Enter OTP "
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="email"
              label="Contact Email "
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="text"
              label="License Number "
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box textAlign="center" mt={4}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: "14rem",
              backgroundColor: "#6a0dad",
              borderRadius: "9px",
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            Submit Registration
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ReceiverForm;
