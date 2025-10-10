import { Box, Button } from "@mui/material";
import { IconMenu2 as MenuIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const DrawerHeaderContents = ({ handleLeftDrawerToggle }) => {
  return (
    <>
      <Box sx={{ display: { xs: "none", sm: "none", md: "inline-block" } }}>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="brand-logo"
              style={{
                marginTop: "1px",
                height: "30px",
                width: "30px",
                marginBottom: "1px",
              }}
            />
          </Link>
          <h2 style={{ display: "inline-block", paddingLeft: "7px" }}>
            MediDrop
          </h2>
        </Box>
      </Box>

      <Button onClick={handleLeftDrawerToggle}>
        <MenuIcon size={22} style={{ color: "#8250df" }} />
      </Button>
    </>
  );
};

export default DrawerHeaderContents;
