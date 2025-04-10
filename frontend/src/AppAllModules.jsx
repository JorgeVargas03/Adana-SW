import { RouterProvider } from "react-router-dom";
import Footer from './share/footer/components/Footer.jsx';
import CommerceRouter from "./navigation/NaviRoutesCommerce";

import "./share/css/allPages.css";
import "./assets/fonts/fonts.css";

export default function AppAllModules() {
    return (
        <>
            <RouterProvider router={CommerceRouter} future={{ v7_startTransition: true, }} />
            <Footer />
        </>
    );
}
