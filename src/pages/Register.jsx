import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  let [formData, setformData] = useState({
    userName: "",
    password: "",
    address: "",
    contact: "",
    email: "",
    regNumber: "",
    role: "",
  });

  let handleInputChange = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
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
      (formData.role === "pharmacy" || formData.role === "ngo") &&
      (!formData.regNumber || !/^\d{4,6}$/.test(formData.regNumber))
    ) {
      newErrors.regNumber = "Enter valid license Number (e.g., 123456)";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          userName: formData.userName,
          password: formData.password,
          address: formData.address,
          contact: formData.contact,
          email: formData.email,
          regNumber: formData.regNumber,
          role: formData.role,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Something went wrong.");
    }
  };

  const handleSendOtp = async () => {
    const { data } = await axios.post("http://localhost:5000/otp/send-otp", {
      phone: formData.contact,
    });
    toast(data.message);
  };

  const handleVerifyOtp = async () => {
    const { data } = await axios.post("http://localhost:5000/otp/verify-otp", {
      phone: formData.contact,
      code: otp,
    });

    if (data.success) {
      setOtpVerified(true);
      toast("OTP verified successfully");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={5}>
      <ToastContainer />
      <Paper
        elevation={3}
        sx={{ p: 4, width: "30%", height: "90vh", borderRadius: "10px" }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <img
            src={logo}
            alt="MediDrop Logo"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Typography variant="h4" fontWeight="bold">
            MediDrop
          </Typography>
        </Box>

        {/* Basic Information */}

        <Grid container spacing={2}>
          {/* NGO Name full width */}

          <Grid item xs={6} sx={{ width: "47%" }}>
            <TextField
              label="User Name "
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              error={!!errors.userName}
              helperText={errors.userName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ width: "48%" }}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                label="your Role"
                error={!!errors.role}
                onChange={handleInputChange}
              >
                <MenuItem value="Donor">Donor</MenuItem>
                <MenuItem value="Ngo">NGO</MenuItem>
                <MenuItem value="Pharmacy">Pharmacy</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="password"
              label="Enter password "
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
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
            <Button onClick={handleSendOtp}>Send OTP</Button>
          </Grid>
          <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
            <TextField
              type="otp"
              label="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
            />
            <Button onClick={handleVerifyOtp}>Verify OTP</Button>
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
              label="register Number "
              name="regNumber"
              value={formData.regNumber}
              onChange={handleInputChange}
              error={!!errors.regNumber}
              helperText={errors.regNumber}
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
            Sign Up
          </Button>
        </Box>
        <Typography textAlign="center" mt={2} variant="body2">
          I have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
