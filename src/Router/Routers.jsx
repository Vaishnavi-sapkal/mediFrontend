import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Medicines from "../pages/Medicines/Medicines";
import HealthTips from "../pages/HealthTips/HealthTips";
import About from "../pages/About/About";
import FAQ from "../pages/FAQ/FAQ";
import Contact from "../Pages/Contact/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonateForm from "../pages/Donate/DonateForm";
import PendingDonation from "../pages/Pending/PendingDonation";
import PendingReceiver from "../pages/Pending/PendingReceiver";
import ShowMedi from "../pages/CRUDpages/showMedi";
import EditMedi from "../pages/CRUDpages/EditMedi";
import ReceiverForm from "../pages/Receiver/ReceiverForm";
import Dashboard from "../pages/Dashboard/Dashboard";
import BestDonar from "../pages/BestDonar/BestDonar";
import Profile from "../pages/Profile/Profile";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="donateform" element={<DonateForm />} />
        <Route path="HealthTips" element={<HealthTips />} />
        <Route path="About" element={<About />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="pendingdonation" element={<PendingDonation />} />
        <Route path="pendingreceiver" element={<PendingReceiver />} />
        <Route path="receiverform" element={<ReceiverForm />} />
        <Route path="medicinedata/:id" element={<ShowMedi />} />
        <Route path="medicinedata/:id/edit" element={<EditMedi />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="healthtips" element={<HealthTips/>}/>
        <Route path="bestDonor" element={<BestDonar/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}
export default Routers;
