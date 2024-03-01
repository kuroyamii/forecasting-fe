import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
const sidebarData = [
  {
    label: "Dashboard",
    icon: <MdDashboard color="currentColor" />,
    path: "/dashboard",
  },
  {
    label: "Forecast Sales",
    icon: <FaChartLine color="currentColor" />,
    path: "/forecast-sales",
  },
  {
    label: "Product Summary",
    icon: <IoBag color="currentColor" />,
    path: "/products",
  },
];

const Sidebar = () => {
  // Initialize router
  const router = useRouter();

  // Initialize state for managing the button state
  const [currentPath, setCurrentPath] = React.useState("");

  // Using useEffect to detect the path
  React.useEffect(() => {
    setCurrentPath;
    console.log(router.pathname);
  });
  return (
    <VStack
      backgroundColor={"white"}
      width={"fit-content"}
      boxShadow={"xl"}
      h={"100vh"}
      p={"2rem"}
      justifyContent={"space-between"}
      position={"sticky"}
      left="0"
      top="0"
    >
      {/* Title and navigation button */}
      <VStack align={"left"} gap={"2rem"}>
        {/* Sidebar title */}
        <Heading size={"2xl"}>Superstore</Heading>
        {/* Navigation Buttons */}
        <VStack width={"full"} gap={"1rem"}>
          {sidebarData.map(({ label, icon, path }, key) => (
            <Link href={path} key={key} className="w-full">
              <Button
                size="lg"
                color={router.pathname.includes(path) ? "blue.400" : "gray.500"}
                variant={"outline"}
                borderColor={
                  router.pathname.includes(path) ? "blue.400" : "white"
                }
                leftIcon={
                  <div
                    className={
                      router.pathname.includes(path)
                        ? "text-blue-400"
                        : "text-gray-500"
                    }
                  >
                    {icon}
                  </div>
                }
                width={"full"}
                justifyContent={"left"}
              >
                {label}
              </Button>
            </Link>
          ))}
        </VStack>
      </VStack>
      {/* User data overview and log out button */}
      <VStack width={"full"} align={"left"} gap="1.5rem">
        {/* User data overview */}
        <VStack align={"left"} gap="0">
          <Text fontWeight={"bold"} fontSize={"1.25rem"}>
            {"Gede Gery Sastrawan"}
          </Text>
          <Text color="gray.400" fontSize="1rem">
            {"gerysastrawan123@gmail.com"}
          </Text>
        </VStack>

        {/* Log out Button */}
        <Button colorScheme="red" size={"lg"}>
          Log out
        </Button>
      </VStack>
    </VStack>
  );
};

export default Sidebar;
