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
import { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditMedi() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [formData, setformData] = useState({
    mediName: "",
    company: "",
    DonarName: "",
    description: "",
    contact: "",
    quantity: 1,
    sealed: false,
    genuine: false,
  });

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/medicinedata/${id}`).then((res) => {
      setformData(res.data);
    });
  }, [id]);

  let handleInputChange = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

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

  const handleButtonclick = () => {
    if (!validateForm()) {
      return;
    }
    axios
      .put(`http://localhost:5000/medicinedata/${id}/edit`, {
        DonarName: formData.DonarName,
        contact: formData.contact,
        company: formData.company,
        mediName: formData.mediName,
        description: formData.description,
        quantity: formData.quantity,
      })
      .then(() => {
        navigate(`/medicinedata/${id}`);
      });
  };
  let handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        minHeight="100vh"
        onSubmit={handleSubmit}
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
                label="Donar's Full Name"
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
                label="Donar's contact number"
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.contact}
                helperText={errors.contact}
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
              <input
                type="file"
                fullwidth="true"
                variant="outlined"
                label="Upload Image"
                name="image"
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, image: e.target.files[0] }))
                }
                sx={{
                  "& .MuiInputBase-input": { paddingTop: "50px", height: 85 },
                }}
              />
            </Grid>

            <Grid item xs={12} paddingTop={2}>
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
          </Grid>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!formData.sealed}
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
                checked={!!formData.genuine}
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
            onClick={handleButtonclick}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </form>
  );
}

export default EditMedi;



