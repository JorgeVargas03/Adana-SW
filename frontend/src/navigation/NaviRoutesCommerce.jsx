import { createBrowserRouter } from "react-router-dom";
import Home from "../ecommerce/home/pages/Home";
import Products from "../ecommerce/products/pages/Products";
import Prices from "../ecommerce/prices/Prices";
import Orders from "../ecommerce/orders/pages/Orders";
import Payments from "../ecommerce/payments/pages/Payments";
import Shippings from "../ecommerce/shippings/pages/Shippings";
import Inventories from "../ecommerce/inventories/pages/Inventories.jsx";
import Error from "../share/errors/pages/Error";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                path: "/inventories",
                element: <Inventories />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/prices",
                element: <Prices />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
            {
                path: "/payments",
                element: <Payments />,
            },
            {
                path: "/shippings",
                element: <Shippings />,
            },
        ],
    },
], {
    future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});
export default router;