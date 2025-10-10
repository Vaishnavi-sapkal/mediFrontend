import { Box, CssBaseline, Drawer } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import DrawerConfig from "../Navbar/DrawerConfig";
import ScrollToTop from "../ScrollToTop";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function BasicLayout({ children }) {
  return (   
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <DrawerConfig />
        <Box
          component="main"
          sx={{ flexGrow: 1, pt: "13px", pb: { xs: 0, md: "20px" } }}
        >
          <DrawerHeader />
          <Box
            component="div"
            className="holder"
            bgcolor="#eef2f6"
            pt="15px"
            mt="14px"
            sx={{
              ml: 0,
              mr: { xs: "0px", sm: 0, md: "20px" },
              mt: "5px",
              px: { xs: "16px", sm: "20px" },
              pb: { xs: "16px", sm: "20px" },
              borderRadius: { sm: 0, md: 3 },
            }}
          >
            <ScrollToTop>
              {children}
            </ScrollToTop>
          </Box>
        </Box>
      </Box>
    </>
  );
}
