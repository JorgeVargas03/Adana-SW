import { Box, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";

import AllPricesTable from "../submodulos/AllPrices/AllPricesTable.jsx";
import PricesTable from "../submodulos/Precios/PreciosTable.jsx";
import RolesTable from "../submodulos/Roles/RolesTable.jsx";
import PromocionesTable from "../submodulos/Promociones/PromocionesTable.jsx";
import NegociosTable from "../submodulos/Negocios/NegociosTable.jsx";

const PricesTabs = ["All Prices", "Precios", "Roles", "Promociones", "Negocios"];

const PricesNavTab = ({ currentTab }) => {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    useEffect(() => {
        switch (currentTab) {
            case "ALL PRICES":
                setCurrentTabIndex(0);
                break;
            case "PRECIOS":
                setCurrentTabIndex(1);
                break;
            case "ROLES":
                setCurrentTabIndex(2);
                break;
            case "PROMOCIONES":
                setCurrentTabIndex(3);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(4);
                break;
            default:
                setCurrentTabIndex(5);
                break;
        }
    }, []);

    const handleChange = (e) => {
        switch (e.target.innerText.toUpperCase()) {
            case "ALL PRICES":
                setCurrentTabIndex(0);
                break;
            case "PRECIOS":
                setCurrentTabIndex(1);
                break;
            case "ROLES":
                setCurrentTabIndex(2);
                break;
            case "PROMOCIONES":
                setCurrentTabIndex(3);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(4);
                break;
            default:
                setCurrentTabIndex(0);
                break;
        }
    };

    const renderTabContent = (index) => {
        switch (index) {
            case 0:
                return <AllPricesTable />;
            case 1:
                return <PricesTable />;
            case 2:
                return <RolesTable />;
            case 3:
                return <PromocionesTable />;
            case 4:
                return <NegociosTable />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {PricesTabs.map((tab) => {
                    return <Tab key={tab} label={tab} />;
                })}
            </Tabs>

            {/* Show content based on the selected tab */}
            <Box sx={{ padding: 2 }}>
                {renderTabContent(currentTabIndex)}
            </Box>
        </Box>
    );
};

export default PricesNavTab;
