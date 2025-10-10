import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import profilePic from "../../assets/profilepic.png";
import backg from "../../assets/button1.jpg";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    address: "",
    contact: "",
    licenseNumber: "",
    role: "",
  });

  const [tab, setTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/role", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(
      "http://localhost:5000/userinfo/edit",
      {
        userName: user.userName,
        email: user.email,
        address: user.address,
        contact: user.contact,
      },
      { withCredentials: true }
    );
    setEditMode(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        borderRadius: "12px",
        boxShadow: 3,
        p: 2,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        style={{
          backgroundImage: `url(${backg})`,
          width: "100%",
          height: 120,
          paddingLeft: 10,
        }}
      >
        <Avatar
          src={profilePic}
          sx={{ width: 90, height: 90, border: "2px solid #ccc" }}
        />
        <Box>
          <Typography variant="h5" style={{ color: "#ffff" }}>
            {user.userName}
          </Typography>
          <Typography color="text.secondary" style={{ color: "#ffff" }}>
            {user.role}
          </Typography>
        </Box>
        {user.role !== "Admin" && (
          <Box flexGrow={1} textAlign="right">
            <Button
              variant="contained"
              size="small"
              onClick={() => setEditMode(!editMode)}
              sx={{
                backgroundColor: "#6829adff",
                "&:hover": { backgroundColor: "#501f82" },
              }}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Tabs */}
      {!editMode && (
        <Tabs
          value={tab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#6829adff" },
          }}
          textColor="inherit"
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: "#6829adff",
              fontWeight: "bold",
              backgroundColor: "#f3e8ff",
              borderRadius: "8px",
              px: 2,
            },
            "& .MuiTab-root": {
              color: "black",
              textTransform: "none",
              fontWeight: 500,
              minWidth: "120px",
            },
          }}
        >
          <Tab label="About" />
          <Tab label="Donated" />
          <Tab label="Received" />
        </Tabs>
      )}

      <CardContent>
        {/* Edit Mode */}
        {editMode && user.role !== "Admin" ? (
          <Box component="form" sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Full Name"
              name="userName"
              value={user.userName}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
            <TextField
              label="Contact Number"
              name="contact"
              value={user.contact}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6829adff",
                "&:hover": { backgroundColor: "#501f82" },
              }}
              onClick={handleUpdate}
            >
              Update Profile
            </Button>
          </Box>
        ) : (
          <>
            {/* About */}
            {tab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                {user.role && (
                  <>
                    <Typography>
                      <b>Email:</b> {user.email || "info not provided"}
                    </Typography>
                    <Typography>
                      <b>Contact:</b> {user.contact || "info not provided"}
                    </Typography>
                    <Typography>
                      <b>Address:</b> {user.address || "info not provided"}
                    </Typography>
                  </>
                )}
                {user.role === "Admin" && (
                  <>
                    <Typography>
                      <b>Description:</b> Managing platform & monitoring NGOs &
                      Donors
                    </Typography>
                  </>
                )}

                {(user.role === "Ngo" || user.role === "Pharmacy") && (
                  <>
                    <Typography>
                      <b>licenseNumber No:</b>{" "}
                      {user.licenseNumber || "info not provided"}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
