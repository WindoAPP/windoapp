import { useState } from "react";
import NavbarDashboard from "../navbarDashboard/navbarDashboard";
import SideBar from "../sideBar/sideBar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [parentState, setParentState] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect( () => {

    if (session) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
}, [session]);

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