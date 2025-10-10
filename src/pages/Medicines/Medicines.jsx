import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Medicines() {
  const [allMedicine, setallMedicine] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/medicinedata").then((res) => {
      console.log(res.data);
      setallMedicine(res.data);
    });
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {allMedicine.map((medicine) => (
        <Grid item xs={12} sm={6} md={4} key={medicine._id}>
          <Card
            sx={{
              width: 350,
              height: 400,
              display: "flex",
              flexDirection: "column",
              borderRadius: "5%",
            }}
          >
            <CardHeader
              title={medicine.mediName}
              sx={{
                "& .MuiCardHeader-title": {
                  fontSize: "1.25rem",
                  fontWeight: 600,
                },
                "& .MuiCardHeader-subheader": {
                  fontSize: "0.9rem",
                  color: "#555",
                },
              }}
            />
            <CardMedia
              component="img"
              height="200"
              image={medicine.image}
              alt="Paella dish"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography
                contained="h4"
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                Company Name : {medicine.company} <br />
                Quantity : {medicine.quantity}
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingLeft: "15px" }}>
              <Link to={`/medicinedata/${medicine._id}`}>
                <Button
                  color="secondary"
                  sx={{
                    width: "8rem",
                    color: "#442281",
                    fontWeight: 900,
                  }}
                >
                  View details...
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
