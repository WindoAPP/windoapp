import React from "react";
import styles from './sidebar.module.scss'
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";



const SideBar = ({sideBarOpen,user}) => {

  const [sideBarOpened, setSideBarOpened] = useState(false);
  const router = useRouter();

  const getRoute = (page) =>{
    return router.asPath.endsWith(page);
  }

  const logout = (e) => {
    e.preventDefault();
    signOut().then(res => {   
            router.push("/");        
    });
}

  return (
    <div>
      <div  className={styles.sidebarIcon} onClick={() => setSideBarOpened(!sideBarOpened)} >
        <i className="fa fa-bars"></i>
      </div>
      <div className={`vertical-nav ${sideBarOpen?styles.sideBarcollaps:''}  ${styles.sideBar} ${sideBarOpened ? styles.sideBarDispaly : ''}`} id="sidebar">
        <div className="mt-2 mb-3 d-flex flex-row align-items-center justify-content-center shadow-sm">
            <img src={'/logo.png'} alt="..." width="80" height="80" className={`mr-3 my-2 ${sideBarOpen?styles.companyLogoSixe:''} ${styles.sideBarImage} `}></img>
        </div>

        {!sideBarOpen && <p className="font-weight-bold  px-3 small pb-1 mb-0">MENU</p>}

        <ul className="nav flex-column  mb-0">
          {!user.isAdmin &&<li className="nav-item">
            <a href="/dashboard">
            <span className={`nav-link  cursor-pointer ${getRoute("/dashboard")?styles.navLinkItem:""}`}>
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-th-large m-2  fa-fw`}></i>
              {!sideBarOpen && "Dashboard"}
            </span>
            </a>
          </li>}
          {user.isAdmin &&<li className="nav-item">
            <a href="/dashboard/admindashboard">
            <span className={`nav-link  cursor-pointer ${getRoute("/dashboard")?styles.navLinkItem:""}`}>
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-th-large m-2  fa-fw`}></i>
              {!sideBarOpen && "Dashboard"}
            </span>
            </a>
          </li>}
          <li className="nav-item">
            <a href="/dashboard/formdata">
            <span className={`nav-link  cursor-pointer ${getRoute("/formdata")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-address-card-o m-2  fa-fw`}></i>
              {!sideBarOpen && "Profile"}
            </span>
            </a>
          </li>
          {!user.isAdmin &&<li className="nav-item">
            <a href="/dashboard/winners">
            <span className={`nav-link  cursor-pointer ${getRoute("/winners")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-trophy m-2  fa-fw`}></i>
              {!sideBarOpen && "Winners"}
            </span>
            </a>
          </li>}
          {user.isAdmin &&<li className="nav-item">
            <a href="/dashboard/allusers">
            <span className={`nav-link  cursor-pointer ${getRoute("/winners")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-users m-2  fa-fw`}></i>
              {!sideBarOpen && "Users"}
            </span>
            </a>
          </li>}
          {!user.isAdmin &&<li className="nav-item">
            <a href="/dashboard/payments">
            <span className={`nav-link  cursor-pointer ${getRoute("/payments")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-credit-card m-2  fa-fw`}></i>
              {!sideBarOpen && "Factures"}
            </span>
            </a>
          </li>}

          {!sideBarOpen &&<p className="font-weight-bold mt-2  px-3 small pb-1 mb-0">ACTIONS</p>}

         <li className="nav-item">
            <a href="/dashboard/profile">
            <span className={`nav-link  cursor-pointer ${getRoute("/profile")?styles.navLinkItem:""}`}>
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-pie-chart m-2  fa-fw`}></i>
              {!sideBarOpen && "Wheel"}
            </span>
            </a>
          </li>
        </ul>

        <ul className="nav flex-column  mb-0">
          <li className="nav-item">
          <a href="/dashboard/qrcode">
            <span href="#" className={`nav-link  cursor-pointer ${getRoute("/qrcode")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-qrcode m-2  fa-fw`}></i>
              {!sideBarOpen && "My QR code"}
            </span>
            </a>
          </li>
          
          
          {!user.isAdmin &&<li className="nav-item ">
          <a href="/dashboard/optin">
            <span href="#" className={`nav-link  cursor-pointer ${getRoute("/optin")?styles.navLinkItem:""}`} >
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-download m-2  fa-fw`}></i>
              {!sideBarOpen && "Opt-in"}
            </span>
            </a>
          </li>}
          
          <li className="nav-item">
            <a href="/login">
            <span className={`nav-link  cursor-pointer `} onClick={signOut}>
              <i className={`${sideBarOpen?styles.sideBarOpen:""} fa fa-sign-out m-2  fa-fw`}></i>
              {!sideBarOpen && "Log Out"}
            </span>
            </a>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default SideBar;





