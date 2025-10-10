import {
  AppBar,
  Box,
  Button,
  Drawer,
  Stack,
  styled,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cloneElement, useEffect, useState } from "react";

import DrawerHeaderContent from "./DrawerHeaderContent";
import {
  IconShoppingCart,
  IconUser,
  IconBell as NotificationsNoneIcon,
} from "@tabler/icons-react";
import { toggle, drawerStatus } from "../../feature/Drawer/DrawerSlice";
import Cart from "./Cart";
import { useAuth } from "../../AuthContex";

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Navbar() {
  const [cookies, , removeCookie] = useCookies([]);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const drawerOpen = useSelector(drawerStatus);

  // const [cookies, removeCookie] = useCookies([]);
  // const [isAuthenticate, setIsAuthenticated] = useState(!!cookies.token);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       setIsAuthenticated(false);
  //       navigate("/");
  //       return;
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:5000",
  //       {},
  //       { withCredentials: true }
  //     );

  //     const { status } = data;
  //     if (status) {
  //       setIsAuthenticated(true);
  //     } else {
  //       removeCookie("token");
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   verifyCookie();
  // }, [cookies.token, navigate, removeCookie]);

  const Logout = async () => {
    await removeCookie("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  
  const Login = async () => {
    setIsAuthenticated(true);
    navigate("/login");
  };
  const Register = async () => {
    setIsAuthenticated(true);
    navigate("/register");
  };

  return (
    <>
      <ElevationScroll>
        <CustomAppBar
          sx={{
            height: "83px",

            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#fff",
          }}
          elevation={0}
          color="light"
          position="fixed"
          open={drawerOpen}
        >
          <Toolbar
            sx={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <DrawerHeader
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "flex-start",
                  sm: "flex-start",
                  md: "space-between",
                },
                gap: 2,
                minWidth: { xs: 105, md: 234 },
                pl: { xs: 0, sm: 0 },
              }}
            >
              <DrawerHeaderContent
                handleLeftDrawerToggle={() => dispatch(toggle())}
              />
            </DrawerHeader>
            <Stack
              direction="row"
              width="100%"
              alignItems="center"
              sx={{
                justifyContent: {
                  xs: "flex-end",
                  sm: "flex-end",
                  md: "space-between",
                },
                ml: 1,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{ width: "100%" }}
              >
                <Box flexGrow={1} />
                <Button>
                  <NotificationsNoneIcon
                    size={22}
                    style={{ color: "#8250df" }}
                  />
                </Button>
                <Button onClick={() => setCartOpen(true)}>
                  <IconShoppingCart size={22} style={{ color: "#8250df" }} />
                </Button>
                <Link to={"/profile"}>
                <Button>
                  <IconUser
                    
                    size={22}
                    style={{ color: "#8250df" }}
                  />

                </Button></Link>
                {isAuthenticated ? (
                  <Button onClick={Logout} style={{ color: "#8250df" }}>
                    LogOut
                  </Button>
                ) : (
                  <Typography
                    component="span"
                    sx={{ color: "#8250df", whiteSpace: "nowrap" }}
                  >
                    <Button
                      style={{
                        color: "#8250df",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                      onClick={Login}
                    >
                      Login
                    </Button>{" "}
                    /{" "}
                    <Button
                      style={{
                        color: "#8250df",
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                      onClick={Register}
                    >
                      SignUp
                    </Button>
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </CustomAppBar>
      </ElevationScroll>
      {/* Drawer with Cart.jsx */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>
      <ToastContainer />
    </>
  );
}
export default Navbar;
