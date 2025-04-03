import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
    return (
        <Link to="/" className={styles.logo_arrange}>
            <img
                src="/icon.png"
                alt="Worldly logo"
                className={`${styles.logo} ${styles.logo_arrange_left}`}
            />
            <p className={styles.logo_arrange_right}>Worldly</p>
        </Link>
    );
}

export default Logo;
