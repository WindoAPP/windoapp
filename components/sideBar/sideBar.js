import React from "react";
import styles from './sidebar.module.scss'
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";



const SideBar = () => {

  const [sideBarOpened, setSideBarOpened] = useState(false);
  const router = useRouter();


  const logout = (e) => {
    e.preventDefault();
    signOut().then(res => {
      console.log(res);
        if (res) {
            router.push("/login");
            
        }
    });

}

  return (
    <div>
      <div  className={styles.sidebarIcon} onClick={() => setSideBarOpened(!sideBarOpened)} >
        <i className="fa fa-bars"></i>
      </div>
      <div className={`vertical-nav  ${styles.sideBar} ${sideBarOpened ? styles.sideBarDispaly : ''}`} id="sidebar">
        <div className="mt-2 mb-3 d-flex flex-row align-items-center justify-content-center shadow-sm">
            <img src={'/logo.png'} alt="..." width="80" height="80" className={`mr-3 my-2 ${styles.sideBarImage} `}></img>
        </div>

        <p className="font-weight-bold  px-3 small pb-1 mb-0">MENU</p>

        <ul className="nav flex-column  mb-0">
          <li className="nav-item">
            <a href="/dashboard">
            <span className={`nav-link  cursor-pointer ${styles.navLink}`}>
              <i className="fa fa-th-large m-2  fa-fw"></i>
              Dashboard
            </span>
            </a>
          </li>
          <li className="nav-item">
            <span href="#" className={`nav-link  cursor-pointer ${styles.navLink}`} >
              <i className="fa fa-trophy m-2  fa-fw"></i>
              Winners
            </span>
          </li>
          <li className="nav-item ">
            <a href="/dashboard/payments">
            <span className={`nav-link  cursor-pointer ${styles.navLink}`} >
              <i className="fa fa-credit-card m-2  fa-fw"></i>
              Subscribes
            </span>
            </a>
          </li>

          <p className="font-weight-bold mt-2  px-3 small pb-1 mb-0">ACTIONS</p>

          <li className="nav-item">
            <a href="/dashboard/profile">
            <span className={`nav-link  cursor-pointer ${styles.navLink}`}>
              <i className="fa fa-pie-chart m-2  fa-fw"></i>
              Wheel
            </span>
            </a>
          </li>
        </ul>

        <ul className="nav flex-column  mb-0">
          <li className="nav-item">
          <a href="/dashboard/qrcode">
            <span href="#" className={`nav-link  cursor-pointer ${styles.navLink}`} >
              <i className="fa fa-qrcode m-2  fa-fw"></i>
              My QR code
            </span>
            </a>
          </li>
          
          <li className="nav-item ">
            <span href="#" className={`nav-link  cursor-pointer ${styles.navLink}`} >
              <i className="fa fa-address-card-o m-2  fa-fw"></i>
              Form data
            </span>
          </li>
          <li className="nav-item ">
            <span href="#" className={`nav-link  cursor-pointer ${styles.navLink}`} >
              <i className="fa fa-download m-2  fa-fw"></i>
              Opt-in
            </span>
          </li>
          
          <li className="nav-item">
            <span className={`nav-link  cursor-pointer ${styles.navLink}`} onClick={logout}>
              <i className="fa fa-sign-out m-2  fa-fw"></i>
              Log Out
            </span>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default SideBar;





