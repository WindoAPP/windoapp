import React from "react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from './navbarDashboard.module.scss';
import { getUser } from "../../services/service";
import { useEffect } from "react";



const NavbarDashboard = () => {

    const { data: session } = useSession();

    const [user, setUser] = useState({});
    const [userImage, setUserImage] = useState("/shop.png");
    const [menu, setMenu] = useState(false);


    useEffect(() => {
        if (session) {
            fetchUser(session.user.uid);
        }
    }, [session]);

    const fetchUser = (id) => {
        getUser(id).then(res => {
            if (res) {
                setUser(res.user);
                if (res.user.profileImage) {
                    setUserImage(res.user.profileImage);
                }
            }
        }).catch(err => {
            console.log(err);

        });
    }

    const router = useRouter();


    const logout = (e) => {
        e.preventDefault();
        signOut().then(res => {
            if (res) {
                router.push("/login");

            }
        });


    }

    return (
        <div className={`navbar bg-light shadow-sm d-flex flex-row justify-content-between`}>
            <div className={`d-flex flex-row align-items-center ${styles.leftRow}`}>
                <i className="fa fa-bars text-secondary" aria-hidden="true"></i>
            </div>
            <div className={`d-flex flex-row align-items-center mx-4  ${styles.leftRow}`}>
                <i className="fa fa-bell-o text-secondary mx-4" aria-hidden="true"></i>
                <img className={`shadow-sm ${styles.navImage} mx-2`} src={userImage}></img>
                <p onClick={()=>setMenu(!menu)} className={`d-flex flex-row align-items-center m-0 mx-2 text-secondary ${styles.adminText}`}>Admin <i class="fa fa-chevron-down mx-2" aria-hidden="true"></i></p>
            </div>
            <div className={`d-flex flex-column bg-light shadow-sm align-items-start p-2 ${styles.dropdownMenu} ${menu?styles.dropdownMenuShow:""}`}>
                <div onClick={()=>router.push("/dashboard/formdata")} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-user-o text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Profile</span>
                </div>
                <div className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-credit-card text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Fctures</span>
                </div>
                <div onClick={()=>router.push("/dashboard/formdata")} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-cogs text-secondary mx-2 " aria-hidden="true"></i>
                    <span className="text-secondary">Settings</span>
                </div>
                <div onClick={logout} className={`d-flex flex-row align-items-center my-2 ${styles.dropdownMenuItem}`}>
                    <i className="fa fa-power-off text-danger mx-2 " aria-hidden="true"></i>
                    <span className="text-danger">Logout</span>
                </div>
                

            </div>
        </div>
    );
};

export default NavbarDashboard;





