import { useEffect, useState } from "react";
import { VerticalBar } from "./verticalBar";
import axios, { all } from "axios";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChart } from "./doughnutChart";
import medicineImg1 from "../../assets/button4.webp";
import medicineImg2 from "../../assets/button2.jpg";
import medicineImg3 from "../../assets/button3.png";
import { Link } from "react-router-dom";

function Dashboard() {
  const [allMedicine, setallMedicine] = useState([]);
  const [allUser, setallUser] = useState([]);
  const [ChartData, setChartData] = useState(null);
  const [Doughnuts, setDoughnuts] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/allmedicinedata").then((res) => {
      setallMedicine(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/alluser").then((res) => {
      setallUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (allMedicine.length > 0) {
      const donorCount = allMedicine.length;
      const receiverCount = allMedicine.filter(
        (med) => med.category == "claimed"
      ).length;

      const labels = ["statistics"];

      const data = {
        labels,
        datasets: [
          {
            label: "donation count",
            data: [donorCount],
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "receiver count",
            data: [receiverCount],
            backgroundColor: "rgba(53, 162, 235, 1)",
          },
        ],
      };

      setChartData(data);
    }
  }, [allMedicine]);

  useEffect(() => {
    if (allUser.length > 0) {
      const donorCount = allUser.filter((user) => user.role == "Donor").length;
      const receiverCount = allUser.filter(
        (user) => user.role == "Ngo" || user.role == "Pharmacy"
      ).length;
      const adminCount = allUser.filter((user) => user.role == "Admin").length;

      const data = {
        labels: ["Donars", "Receivers", "Admins"],
        datasets: [
          {
            label: "# of Roles",
            data: [donorCount, receiverCount, adminCount],
            backgroundColor: [
              // "rgba(255, 99, 132, 0.5)",
              // "rgba(54, 162, 235, 0.5)",
              // "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              // "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setDoughnuts(data);
    }
  }, [allUser]);

  return (
    <Paper sx={{ height: "100vh" }}>
      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ width: "60%", p: "30px", height: "60vh" }}
        >
          <Typography variant="h6" gutterBottom>
            Donation vs Claimed Medicines
          </Typography>
          {ChartData ? <VerticalBar data={ChartData} /> : <CircularProgress />}
        </Grid>
        {/* Doughnut Chart */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ width: "35%", p: "30px", height: "60vh" }}
        >
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: "20px" }}>
            User Role Distribution
          </Typography>
          {Doughnuts ? <Doughnut data={Doughnuts} /> : <CircularProgress />}
        </Grid>
      </Grid>
      <Box sx={{ height: "10vh" }}></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ width: "30%", margin: "10px" }}>
          <Link to="/medicines">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
                borderRadius: "10px",
                backgroundImage: `url(${medicineImg1})`,
                color: "#090909a3",
              }}
            >
              <h4>View All Donations.... </h4>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ width: "30%", margin: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
              height: "20vh",
              borderRadius: "10px",
              backgroundImage: `url(${medicineImg2})`,
              color: "#09090989",
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ width: "30%", margin: "10px" }}>
          <Link to="/bestdonor">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "green",
                height: "20vh",
                borderRadius: "10px",
                backgroundImage: `url(${medicineImg3})`,
                color: "#090909a3",
              }}
            >
              <h4>See Current Best Donor.... </h4>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Dashboard;
