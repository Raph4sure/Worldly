import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
// import Logo from './pages/Logo';

const BASE_URL = "http://localhost:8000";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchData() {
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
        fetchData();
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="product" element={<Product />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route
                            index
                            element={
                                <Navigate replace to="cities"/>
                            }
                        />
                        <Route
                            path="cities"
                            element={
                                <CityList
                                    cities={cities}
                                    isLoading={isLoading}
                                />
                            }
                        />
                        <Route path="cities/:id" element={ <City/>} />
                        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading } />} />
                        <Route path="form" element={<Form/>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
