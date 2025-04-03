import { NavLink } from "react-router-dom";
import styles from "./cheat.module.css";

function Navbar() {
    return (
        // <nav className={styles.nav}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Home
            </NavLink>
        // </nav>
    );
}

export default Navbar;
