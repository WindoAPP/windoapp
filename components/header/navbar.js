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
          height={70}
          width={200}
          priority
        />
        <div className={styles.sidebarIcon} onClick={() => onClickOpenSideBar()}>
          <i className="fa fa-bars"></i>
        </div>
        <div className={`collapse navbar-collapse ${styles.navWeb}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ml-3">
              <Link href="/" className={styles.navTextItem}>
                How it Works
              </Link>
            </li>
            <li className="nav-item ml-4">
              <Link href="/about" className={styles.navTextItem}>
                Prices
              </Link>
            </li>
            <li className="nav-item ml-4">
              <Link href="/contact" className={styles.navTextItem}>
                Contact
              </Link>
            </li>
            <li className="nav-item mx-4">
              <button onClick={() => router.push("/login")} className='btn btn-warning'>Book Demo</button>
            </li>
          </ul>
        </div>
        {sideBarShow &&
          <div className={`shadow ${styles.navMobile}`} id="navbarNav">

            <ul className="navbar-nav ml-auto">
              <li className="nav-item my-3">
                <Link href="/" className={styles.navTextItem}>
                  How it Works
                </Link>
              </li>
              <li className="nav-item my-3">
                <Link href="/about" className={styles.navTextItem}>
                  Prices
                </Link>
              </li>
              <li className="nav-item my-3">
                <Link href="/contact" className={styles.navTextItem}>
                  Contact
                </Link>
              </li>
              <li className="nav-item my-3 mx-3">
                <button onClick={() => router.push("/login")} className='btn btn-warning'>Book Demo</button>
              </li>
            </ul>
          </div>}

      </div>
    </nav>
  );
};

export default Navbar;
