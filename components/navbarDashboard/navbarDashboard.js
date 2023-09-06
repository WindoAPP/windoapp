import React from "react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from './navbarDashboard.module.scss';
import { getAllNotifications, getUser } from "../../services/service";
import { useEffect } from "react";
import SideBar from "../sideBar/sideBar";
import NotificationPanel from "../notificationPanel/notificationPanel";
import Loader from "../Loader/loader";



const NavbarDashboard = ({ onDataUpdate }) => {

    const { data: session } = useSession();

    const [user, setUser] = useState({});
    const [userImage, setUserImage] = useState("/shop.png");
    const [menu, setMenu] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [hasNewNotifi, setHasNewNotifi] = useState(false);
    const [notifiBarOpen, setNotifiBarOpen] = useState(false);
    const [notifiCount, setNotifiCount] = useState(0);
    const [isLoading,setIsloading] =useState(true);


    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                setIsloading(false)
                if(res.notificationCount==0){
                    setHasNewNotifi(false);
                }else{
                    setHasNewNotifi(true);
                    setNotifiCount(res.notificationCount);
                }
                if (res.user.profileImage) {
                    setUserImage(res.user.profileImage);
                }
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const router = useRouter();


    const onClickSideBarBtn = ()=>{
        setSideBarOpen(!sideBarOpen);
        onDataUpdate(!sideBarOpen);
    }

    const onClickNotifiBtn = ()=>{
        setHasNewNotifi(false);
        setNotifiBarOpen(!notifiBarOpen);
    }

    return (
        <>
        <div className={`navbar bg-light shadow-sm d-flex flex-row  ${styles.navBarMainWrapper}`}>
            <div className={`d-flex flex-row align-items-center ${styles.leftRow} ${sideBarOpen?styles.leftRow1:''}`} onClick={onClickSideBarBtn}>
                <i className={`fa fa-bars text-secondary cursor-pointer ${styles.barsIcon}`} aria-hidden="true"></i>
            </div>
            <div className={`d-flex flex-row align-items-center mx-4  ${styles.leftRow}`}>
                <i className="fa fa-bell-o text-secondary mx-4 cursor-pointer" aria-hidden="true" onClick={onClickNotifiBtn}></i>
                {hasNewNotifi && <div className={styles.notificationDot}>{notifiCount}</div>}
                <img className={`shadow-sm ${styles.navImage} mx-2`} src={userImage}></img>
                <p onClick={()=>setMenu(!menu)} className={`d-flex flex-row align-items-center m-0 mx-2 text-secondary ${styles.adminText}`}>Administrateur <i className="fa fa-chevron-down mx-2" aria-hidden="true"></i></p>
            </div>
            <div className={`d-flex flex-column bg-light shadow-sm align-items-start p-2 ${styles.dropdownMenu} ${menu?styles.dropdownMenuShow:""}`}>
                <div onClick={()=>router.push("/dashboard/formdata")} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-user-o text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Profil</span>
                </div>
                <div className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-credit-card text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Factures</span>
                </div>
                <div onClick={()=>router.push("/dashboard/formdata")} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-cogs text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Paramètres</span>
                </div>
                <div onClick={signOut} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-power-off text-danger mx-2 " aria-hidden="true"></i>
                    <span className="text-danger">Se déconnecter</span>
                </div>
            </div>
        </div>
        {!isLoading && <SideBar sideBarOpen={sideBarOpen} user={user}/>}
        {notifiBarOpen && <NotificationPanel />}
        {isLoading &&  <Loader/>}
        </>
    );
};

export default NavbarDashboard;





