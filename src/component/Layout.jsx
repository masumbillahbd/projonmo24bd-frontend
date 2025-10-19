import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // Outlet is placeholder for dynamic content

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-content-body">
        <div className="row gx-4">
          {/* Sidebar */}
          <aside className="col-lg-2 d-none d-sm-none d-md-none d-lg-block sidebar-sticky">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="col-lg-10 pt-0  content-wrapper">
            <Outlet /> {/* Dynamic content goes here */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
