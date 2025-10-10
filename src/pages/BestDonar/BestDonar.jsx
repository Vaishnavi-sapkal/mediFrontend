import React from "react";
import {
  Box,
  Paper,
  Avatar,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";

import profileImg from "../../assets/profilepic.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const BestDonar = () => {
  const smallScreen = useMediaQuery("(max-width:1065px)");
  const tinyScreen = useMediaQuery("(max-width:349px)");

  const [bestDonor, setBestDonor] = useState(null);

  useEffect(() => {
    axios.get("https://medibackend-au6d.onrender.com/bestdonor").then((res) => {
      setBestDonor(res.data);
      console.log(res.data);
    });
  }, []);

  // 👑 Crown SVG Component
  const Crown = ({ color }) => (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      style={{ width: "5rem" }}
    >
      <polygon points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50" />
    </svg>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "10px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      {bestDonor ? (
        <>
          {/* 🌟 Section Title */}
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#4b4b4b" }}>
              🏆 Best Donor of MediDrop
            </Typography>

            <Button
              variant="contained"
              sx={{
                background: "#7e57c2",
                borderRadius: "25px",
                textTransform: "none",
                px: 3,
                py: 1,
                "&:hover": { background: "#5e35b1" },
              }}
              href="/donateform"
            >
              Donate Now
            </Button>
          </Box>

          {/* 👤 Donor Display Section */}
          <Box
            sx={{
              borderRadius: "14px",
              width: smallScreen ? "90%" : "500px",
              margin: "0 auto",
              boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
              p: 3,
              backgroundColor: "#f9f9ff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                flexDirection: "column",
                alignItems: "center",
                mb: 6,
              }}
            >
              {/* 👑 Crown above avatar */}
              <Box sx={{ position: "absolute", top: "10px" }}>
                <Crown color="#7e57c2" />
              </Box>

              {/* Profile Avatar */}
              <Avatar
                src={profileImg}
                alt="Shruti Bharat Pailwan"
                sx={{
                  width: 100,
                  height: 100,
                  border: "6px solid #7e57c2",
                  marginTop: "3.5rem",
                }}
              />

              {/* Name */}
              <Typography sx={{ mt: 2, fontWeight: 600, fontSize: "1.3rem" }}>
                {bestDonor.name}
              </Typography>
            </Box>

            {/* 🧾 Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.4fr 0.5fr 1fr 1fr",
                textAlign: "center",
                backgroundColor: "#e3e3e3",
                fontWeight: 600,
                p: "10px",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <Box>#</Box>
              <Box>Avatar</Box>
              <Box sx={{ textAlign: "center" }}>Name</Box>
              <Box sx={{ textAlign: "right", pr: "25px" }}>
                {tinyScreen ? "Donation" : "Total Donation"}
              </Box>
            </Box>

            {/* 🧍 Single Donor Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.4fr 0.5fr 1fr 1fr",
                alignItems: "center",
                textAlign: "center",
                p: "8px",
                backgroundColor: "#7e57c2",
                color: "#fff",
                fontSize: "15px",
              }}
            >
              <span>1</span>
              <Avatar
                alt="Shruti Bharat Pailwan"
                src={profileImg}
                style={{ marginLeft: 20 }}
              />
              <span
                style={{
                  textAlign: "center",
                  display: "inline-block",
                  paddingLeft: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                {bestDonor.name}
              </span>
              <span
                style={{
                  textAlign: "right",
                  display: "inline-block",
                  paddingRight: "25px",
                }}
              >
                {bestDonor.donationCount}
              </span>
            </Box>
          </Box>
        </>
      ) : (
        // 🔄 Show loading state
        <Typography>Loading best donor...</Typography>
      )}
    </Paper>
  );
};

export default BestDonar;
