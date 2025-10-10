import { List, Divider, Box } from "@mui/material";
import {
  IconHome as Home,
  IconVaccineBottle,
  IconMessage,
  IconAddressBook,
  IconNotebook,
  IconDashboard,
  IconHeartHandshake,
  IconHourglass,
  IconClock,
  IconActivity,
  IconMan,
  IconTrophy,
  IconStethoscope,
} from "@tabler/icons-react";
import BrandAuthImg from "../../auth/BrandAuthImg";
import SingleNavLink from "./SingleNavLink";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const DrawerLists = ({ drawerWidth = 260, isSmallScreen }) => {
  const [role, setrole] = useState(null);

  useEffect(() => {
    const checkAndFetchRole = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        const { status } = data;

        if (status) {
          const res = await axios.get("http://localhost:5000/role", {
            withCredentials: true,
          });
          console.log("my role is : ", res.data.role);
          setrole(res.data.role);
        } else {
          console.warn("User not logged in");
        }
      } catch (error) {
        console.warn("User not logged in or server error", error.message);
      }
    };

    checkAndFetchRole();
  }, []);

  return (
    <Box component="div" sx={{ width: drawerWidth }}>
      {isSmallScreen && (
        <Box p="28px 20px 0px 30px">
          <BrandAuthImg height={80} disableMargin={true} />
        </Box>
      )}
      <List sx={{ pt: "5rem" }}>
        {role === "Admin" && (
          <>
            <SingleNavLink
              link="/dashboard"
              text="Dashboard"
              icon={<IconDashboard size={20} />}
            />

            <SingleNavLink
              link="/pendingdonation"
              text="Pending Donation "
              icon={<IconClock size={20} />}
            />

            <SingleNavLink
              link="/pendingreceiver"
              text="Pending Receiver "
              icon={<IconHourglass size={20} />}
            />
          </>
        )}
        {role !== "Admin" && (
          <SingleNavLink link="/" text="Home" icon={<Home size={20} />} />
         )} 

        <SingleNavLink
          link="/medicines"
          text="Medicine"
          icon={<IconVaccineBottle size={20} />}
        />
        
        <SingleNavLink
          link="/donateform"
          text="Donate"
          icon={<IconHeartHandshake size={20} />}
        />
         <SingleNavLink
          link="/bestDonor"
          text="Best Donor"
          icon={<IconTrophy size={20} />}
        />
         <SingleNavLink
          link="/healthtips"
          text="Health Tips"
          icon={<IconStethoscope size={20} />}
        />
      </List>
      <Divider />
      <List>
        <>
          <SingleNavLink
            link="/faq"
            text="FAQ"
            icon={<IconMessage size={20} />}
          />
          <SingleNavLink
            link="/contact"
            text="Contact"
            icon={<IconAddressBook size={20} />}
          />
          <SingleNavLink
            link="/about"
            text="About"
            icon={<IconNotebook size={20} />}
          />
        </>
      </List>
    </Box>
  );
};

export default DrawerLists;
