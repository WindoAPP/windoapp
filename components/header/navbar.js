import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light shadow">
      <div className="container">
      <Image
                src="/logo.png"
                alt="Vercel Logo"
                className={styles.logoImage}
                height={70}
                width={200}
                priority
              />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
              <button className='btn btn-success'>Book Demo</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
