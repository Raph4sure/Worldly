// using useReducer
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            throw new Error("Unknown action type");
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch {
                dispatch({
                    type: "rejected",
                    payload: "There was a problem loading the data...",
                });
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was a problem loading the city...",
            });
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            dispatch({ type: "city/created", payload: data });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was a problem creating the city...",
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
            dispatch({ type: "city/deleted", payload: id });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was a problem deleting the city...",
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                error,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };

    
    

    
// using useState
/* import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was a problem loading the data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert("There was a problem loading the data...");
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);

            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            setCities((cities) => [...cities, data]);
        } catch {
            alert("There was a problem creating the city.");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        
        setIsLoading(true);
        // console.log("DELETE CITY - Setting loading TRUE");
        try {
            await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
            // console.log("DELETE CITY - Fetch successful");

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch {
            alert("There was a problem deleting the city.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        > 
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
 */
