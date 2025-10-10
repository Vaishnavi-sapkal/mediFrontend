import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function PendingDonation() {
  const [Medicines, setMedicines] = useState([]);

  const handleStatus = (id, newStatus) => {
    axios.patch(`http://localhost:5000/pendingDonation/${id}/status`, {
      status: newStatus,
    });
    setMedicines((prev) => prev.filter((med) => med._id !== id));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/pendingDonation").then((res) => {
      console.log(res.data);
      setMedicines(res.data);
    });
  }, []);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Pending Donation Requests
      </Typography>
      <Box>
        {Medicines.map((medicine) => (
          <Card
            key={medicine._id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: " 20px",
            }}
          >
            {/* Details */}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="subtitle1">
                Medicine:{medicine.mediName}
              </Typography>
              <Typography variant="body2">
                Donated by : {medicine.donarId.userName}
              </Typography>
              <Typography variant="body2">
                Company : {medicine.company}
              </Typography>
              <Typography variant="body2">
                Dosages:{medicine.quantity}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: "20px",
                  backgroundColor: "#750b80c8",
                  display: "inline-block",
                  color: "white",
                }}
              >
                pending
              </Typography>
            </CardContent>

            {/* Actions */}
            <Stack spacing={1}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleStatus(medicine._id, "rejected")}
                sx={{ borderRadius: "10px" }}
              >
                REJECT
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleStatus(medicine._id, "accepted")}
                sx={{ borderRadius: "10px" }}
              >
                APPROVE
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default PendingDonation;
