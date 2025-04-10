import { Box } from "@mui/material";
import PricesNavTab from "./components/PricesNavTab.jsx";

const Prices = () => {
    const current = "PRICES";
    return (
        <Box>
            <PricesNavTab currentTab={"ALL PRICES"}/>
        </Box>
    );
};

export default Prices;
