import NavbarDashboard from "../navbarDashboard/navbarDashboard";
import SideBar from "../sideBar/sideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarDashboard/>
       <SideBar/>
      <div className="dashboard-component">
        {children}
      </div>
    </div>
  );
};

export default Layout;