import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { FaPersonCirclePlus } from "react-icons/fa6";
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
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);

  // Initialize state for managing the button state
  const [currentPath, setCurrentPath] = React.useState("");

  const handleLogout = (e: any) => {
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
    router.push("/auth/login");
  };

  React.useEffect(() => {
    let at = localStorage.getItem("at");
    if (at) {
      let jwt: any = jwtDecode(at);

      setFullName(jwt.data.first_name + " " + jwt.data.last_name);
      setEmail(jwt.data.email);
      if (jwt.data.role_id === 2) {
        setIsSuperAdmin(true);
      } else {
        setIsSuperAdmin(false);
      }
    }
  });
  // Using useEffect to detect the path
  React.useEffect(() => {
    setCurrentPath;
  });
  return (
    <VStack
      backgroundColor={"white"}
      width={"fit-content"}
      boxShadow={"xl"}
      h={"100vh"}
      p={{ "2xl": "2rem", lg: "1.5rem", base: "1rem" }}
      justifyContent={"space-between"}
      position={"sticky"}
      left="0"
      top="0"
    >
      {/* Title and navigation button */}
      <VStack align={"left"} gap={"2rem"}>
        {/* Sidebar title */}
        <Heading size={{ "2xl": "2xl", base: "lg", lg: "xl" }}>
          Superstore
        </Heading>
        {/* Navigation Buttons */}
        <VStack width={"full"} gap={"1rem"}>
          {sidebarData.map(({ label, icon, path }, key) => (
            <Link href={path} key={key} className="w-full">
              <Button
                size={{ "2xl": "lg", base: "sm", lg: "md" }}
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
          {isSuperAdmin && (
            <Link href={"/admin/invite"} className="w-full">
              <Button
                size={{ "2xl": "lg", base: "sm", lg: "md" }}
                color={
                  router.pathname.includes("/admin/invite")
                    ? "blue.400"
                    : "gray.500"
                }
                variant={"outline"}
                borderColor={
                  router.pathname.includes("/admin/invite")
                    ? "blue.400"
                    : "white"
                }
                leftIcon={
                  <div
                    className={
                      router.pathname.includes("/admin/invite")
                        ? "text-blue-400"
                        : "text-gray-500"
                    }
                  >
                    {<FaPersonCirclePlus color="currentColor" />}
                  </div>
                }
                width={"full"}
                justifyContent={"left"}
              >
                {"Invite Admin"}
              </Button>
            </Link>
          )}
        </VStack>
      </VStack>
      {/* User data overview and log out button */}
      <VStack width={"full"} align={"left"} gap="1.5rem">
        {/* User data overview */}
        <VStack align={"left"} gap="0">
          <Text
            fontWeight={"bold"}
            fontSize={{ "2xl": "1.25rem", base: "1.15rem" }}
          >
            {fullName}
          </Text>
          <Text color="gray.400" fontSize={{ "2xl": "1rem", base: "0.8rem" }}>
            {email}
          </Text>
        </VStack>

        {/* Log out Button */}
        <Button
          colorScheme="red"
          size={{ "2xl": "lg", base: "sm", lg: "md" }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </VStack>
    </VStack>
  );
};

export default Sidebar;
