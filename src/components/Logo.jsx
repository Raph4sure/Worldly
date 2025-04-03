import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
    return (
        <NavLink to="/" className={styles.logo_arrange}>
            <img
                src="/icon.png"
                alt="Worldly logo"
                className={`${styles.logo} ${styles.logo_arrange_left}`}
            />
            <span className={styles.logo_arrange_right}>Worldly</span>
        </NavLink>
    );
}

export default Logo;
