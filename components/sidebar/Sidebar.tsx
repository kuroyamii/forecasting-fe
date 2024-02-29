import { Button, Heading } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
const sidebarData = [
  { label: "Dashboard", icon: <MdDashboard color="currentColor" /> },
  { label: "Forecast Sales", icon: <FaChartLine color="currentColor" /> },
  { label: "Product Summary", icon: <IoBag color="currentColor" /> },
];

const Sidebar = () => {
  return (
    <div>
      <Heading>Superstore</Heading>
      {sidebarData.map(({ label, icon }, key) => (
        <Button
          key={key}
          leftIcon={<div className="text-blue-400">{icon}</div>}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
