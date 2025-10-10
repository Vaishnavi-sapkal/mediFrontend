import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonateForm() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [formData, setformData] = useState({
    mediName: "",
    company: "",
    DonarName: "",
    description: "",
    image: "",
    contact: "",
    quantity: 1,
    sealed: false,
    genuine: false,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mediName.trim()) {
      newErrors.mediName = "Medicine name is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "company name is required";
    }
    if (!formData.DonarName.trim()) {
      newErrors.DonarName = "Donor name is required";
    }
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit contact number";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    if (!formData.sealed) {
      newErrors.sealed = "";
    }

    if (!formData.genuine) {
      newErrors.genuine = "";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let handleInputChange = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = new FormData();
      data.append("DonarName", formData.DonarName);
      data.append("contact", formData.contact);
      data.append("company", formData.company);
      data.append("mediName", formData.mediName);
      data.append("description", formData.description);
      data.append("quantity", formData.quantity);
      if (formData.image) {
        console.log("image url..........", formData.image);
        data.append("image", formData.image);
      }

      const res = await axios.post("https://medibackend-au6d.onrender.com/newform", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", res.data);
      navigate("/medicines");
    } catch (err) {
      console.error("Error saving form:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        minHeight="100vh"
        p={2}
      >
        <Paper elevation={2} sx={{ p: 4, width: "100%", borderRadius: "10px" }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: "50px", fontWeight: 500 }}
          >
            Donation Form
          </Typography>

          {/* Grid */}
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
              <TextField
                label="Medicine Name"
                id="Medicine Name"
                fullWidth
                value={formData.mediName}
                name="mediName"
                onChange={handleInputChange}
                error={!!errors.mediName}
                helperText={errors.mediName}
              />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
              <TextField
                label="Company name"
                fullWidth
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                error={!!errors.company}
                helperText={errors.company}
              />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
              <TextField
                label="Donor's Full Name"
                fullWidth
                name="DonarName"
                value={formData.DonarName}
                onChange={handleInputChange}
                error={!!errors.DonarName}
                helperText={errors.DonarName}
              />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
              <TextField
                label="Donor's contact number"
                type="number"
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
                label="Enter Decription"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                sx={{ "& .MuiInputBase-input": { height: 120 } }}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: "100%", md: "500px" } }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  height: 85,
                  paddingTop: "15px",
                  textTransform: "none",
                  borderColor: "grey",
                  color: "grey",
                }}
              >
                Upload Image of the medicine
                <input
                  type="file"
                  hidden
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setformData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
                />
              </Button>
              {formData.image && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {formData.image.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} paddingTop={2}>
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                fullWidth
              />
            </Grid>
          </Grid>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sealed}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, sealed: e.target.checked }))
                }
              />
            }
            label="Medicine is unopened/sealed"
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.genuine}
                onChange={(e) =>
                  setformData((prev) => ({
                    ...prev,
                    genuine: e.target.checked,
                  }))
                }
              />
            }
            label="I confirm medicines are genuine & safe"
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "8rem",
              backgroundColor: "#8250df",
              borderRadius: "10px",
            }}
          >
            Donate Now
          </Button>
        </Paper>
      </Box>
    </form>
  );
}

export default DonateForm;
