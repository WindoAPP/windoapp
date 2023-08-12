import { useState } from "react";
import NavbarDashboard from "../navbarDashboard/navbarDashboard";
import SideBar from "../sideBar/sideBar";

const Layout = ({ children }) => {
  const [parentState, setParentState] = useState(false);

  const handleDataUpdate = (newValue) => {
    setParentState(newValue); // Update the parent's state with data from the child
  };
  return (
    <div>
      <NavbarDashboard onDataUpdate={handleDataUpdate}/>    
      <div className={`${!parentState?'dashboard-component':'dashboard-component-close'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;