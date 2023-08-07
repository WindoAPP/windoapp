import SideBar from "../sideBar/sideBar";

const Layout = ({ children }) => {
    return (
      <div>
        <SideBar/>
        <div className="dashboard-component">
          {children}
        </div>
      </div>
    );
  };
  
  export default Layout;