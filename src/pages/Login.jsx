import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [formData, setformData] = useState({
    password: "",

    email: "",
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

    if (!formData.password.trim()) {
      newErrors.password = "password is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "email is required";
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
        "https://medibackend-au6d.onrender.com/login",
        {
          password: formData.password,

          email: formData.email,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <ToastContainer />
      <Box
        sx={{
          width: 350,
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Logo + Title */}
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

        {/* Email */}
        <TextField
          type="email"
          label=" Email "
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        {/* Password */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#6a0dad", // violet
            "&:hover": { bgcolor: "#6829adff" },
          }}
          onClick={handleSubmit}
        >
          LOG IN
        </Button>

        {/* Register link */}
        <Typography textAlign="center" mt={2} variant="body2">
          Don’t have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
