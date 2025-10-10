import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconMedicineSyrup } from "@tabler/icons-react";
import medicineImg from "../../assets/medicine.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left side - Text */}
        <Grid item xs={12} sm={6}>
          <Stack spacing={3}>
            <Typography
              variant="h4"
              fontWeight={600}
              className="doctor-img"
              sx={{
                color: "#442281",
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                lineHeight: 1.4,
              }}
            >
              A Digital Platform For Medicine & <br />
              Healthcare, Providing Access <br />
              To Those In Need.
            </Typography>

            <Typography
              className="doctor-img"
              variant="body1"
              sx={{ color: "#555" }}
            >
              We connect Donors to NGO's or medicals and get the help they
              <br />
              need by providing Medicine and healthcare services online.
            </Typography>

            <Button
              className="doctor-img"
              sx={{
                width: "200px",
                color: "whitesmoke",
                p: "10px",
                mt: 2,
                borderTopLeftRadius: "17px",
                borderBottomRightRadius: "17px",
                backgroundColor: "#442281",
                "&:hover": { backgroundColor: "#331a61" },
              }}
              variant="contained"
              disableElevation
              onClick={() => navigate("/medicines")}
              size="large"
              endIcon={<IconMedicineSyrup size={20} />}
            >
              Get Medicine
            </Button>
          </Stack>
        </Grid>

        {/* Right side - Image */}
        <Grid item xs={12} sm={6}>
          <Stack alignItems="center" justifyContent="center">
            <img
              src={medicineImg}
              alt="Medicine"
              className="doctor-img"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                marginTop: "40px",
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
