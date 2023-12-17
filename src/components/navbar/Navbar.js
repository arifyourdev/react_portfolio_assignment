import React from 'react';
import styles from "./navbar.module.css";
import Logo from "../../images/logo.png";

const Navbar = () => {
    return (
        <div className={styles.navbar_navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="logo" />
                <span>PhotoFolio</span>
            </div></div>
    )
}

export default Navbar