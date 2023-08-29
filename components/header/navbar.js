import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.scss'
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [sideBarShow, setSideBarShow] = useState(false);

  const onClickOpenSideBar = () => {
    setSideBarShow(!sideBarShow);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light shadow">
      <div className="container">
        <Image onClick={() => router.push("/")}
          src="/logo.png"
          alt="Vercel Logo"
          className={styles.logoImage}
          height={80}
          width={250}
          priority
        />
        <div className={styles.sidebarIcon} onClick={() => onClickOpenSideBar()}>
          <i className="fa fa-bars"></i>
        </div>
        <div className={`collapse navbar-collapse justify-content-between ${styles.navWeb}`} id="navbarNav">
          <ul className="navbar-nav align-items-center ml-auto">
            <li className="nav-item ml-3">
              <Link href="/#howitworks" className={styles.navTextItem}>
                Comment ça marche ?
              </Link>
            </li>
            <li className="nav-item ml-4">
              <Link href="/#prix" className={styles.navTextItem}>
                Prix
              </Link>
            </li>
          </ul>
          <div>
            <button onClick={() => router.push("/register")} className={styles.bookDemoBtn}>S'abonner</button>
            <button onClick={() => router.push("/login")} className={`${styles.bookDemoBtn} mx-4`}>Se connecter</button>
          </div>
        </div>
        {sideBarShow &&
          <div className={`shadow ${styles.navMobile}`} id="navbarNav">

            <ul className="navbar-nav ml-auto">
              <li className="nav-item my-3">
                <Link href="/#howitworks" className={styles.navTextItem}>
                  Comment ça marche ?
                </Link>
              </li>
              <li className="nav-item my-3">
                <Link href="/#prix" className={styles.navTextItem}>
                  Prix
                </Link>
              </li>

              <li className="nav-item my-3 mx-3">
                <div>
                  <button onClick={() => {router.push("/register"); setSideBarShow(!sideBarShow); }} className={styles.bookDemoBtn}>S'abonner</button>
                  <button onClick={() => {router.push("/login"); setSideBarShow(!sideBarShow);}} className={`${styles.bookDemoBtn} mx-4`}>Se connecter</button>
                </div>
              </li>
            </ul>
          </div>}

      </div>
    </nav>
  );
};

export default Navbar;
