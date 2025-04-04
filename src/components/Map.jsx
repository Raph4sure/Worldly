import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            <p>Map</p>
            <h1>
                Position
                lat={lat}
                lng={lng}
            </h1>
        </div>
    );
}

export default Map;
