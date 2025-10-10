import { Outlet } from "react-router-dom";
import BasicLayout from "./BasicLayout";
import Footer from "../Footer";

function Layout() {
  return (
    <BasicLayout>
      <Outlet />
      <Footer />
    </BasicLayout>
  );
}
export default Layout;
