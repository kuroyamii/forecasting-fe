import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import BaseLayout from "@/components/layouts/BaseLayout";

import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const DashboardPage = () => {
  // Dummy data
  const data = [
    { label: "Jan", income: 20, expense: 35 },
    { label: "Feb", income: 15, expense: 29 },
    { label: "Mar", income: 77, expense: 18 },
    { label: "Apr", income: 30, expense: 25 },
    { label: "May", income: 40, expense: 18 },
    { label: "Jun", income: 40, expense: 18 },
    { label: "Jul", income: 27, expense: 23 },
    { label: "Aug", income: 32, expense: 25 },
    { label: "Sep", income: 77, expense: 18 },
    { label: "Oct", income: 32, expense: 25 },
    { label: "Nov", income: 40, expense: 18 },
    { label: "Des", income: 32, expense: 25 },
  ];
  const topCategory = "Furniture";
  const totalProduct = 9999;

  const router = useRouter();

  return (
    <BaseLayout>
      {/* Title */}
      <Heading size={"2xl"} color={"blue.900"} mt={4} mb={8}>
        Main Dashboard
      </Heading>

      {/* Sales Growth Section */}
      <VStack
        align={"left"}
        width={"full"}
        p={8}
        backgroundColor={"white"}
        rounded={"lg"}
        overflow={"hidden"}
        shadow={"md"}
      >
        <VStack align={"left"} pl={8} mb={8} gap={0}>
          <Heading size={"lg"} color={"blue.900"}>
            Sales Growth
          </Heading>
          <Text size={"sm"} color={"gray.400"}>
            Every month
          </Text>
        </VStack>
        <ResponsiveContainer width={"100%"} height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray={"3 3"} /> */}
            <XAxis dataKey={"label"} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#A0AEC0"
              fill="#EDF2F7"
            />
          </AreaChart>
        </ResponsiveContainer>
      </VStack>

      <Grid
        templateRows={"repeat(2,1fr)"}
        templateColumns={"repeat(3,1fr)"}
        w={"full"}
        h="fit-content"
        gap={4}
        mt={4}
      >
        <GridItem
          backgroundColor={"white"}
          color={"blue.900"}
          fontWeight={"bold"}
          rounded={"lg"}
          overflow={"hidden"}
          shadow={"md"}
          p={"2rem"}
        >
          <VStack align={"left"} justifyContent={"center"} height="full">
            <Heading size={"lg"} color={"blue.900"}>
              Total Product
            </Heading>
            <HStack align="end">
              <Heading size={"3xl"} mt="1rem">
                {totalProduct
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
              </Heading>
              <Text
                fontSize={"1.5rem"}
                color={"gray.400"}
                fontWeight={"medium"}
              >
                Products
              </Text>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem
          p={"2rem"}
          backgroundColor={"white"}
          color={"blue.900"}
          fontWeight={"bold"}
          rowSpan={2}
          colSpan={2}
          rounded={"lg"}
          overflow={"hidden"}
          shadow={"md"}
        >
          <VStack align={"left"}>
            <Heading size={"lg"} color={"blue.900"}>
              Top Transaction
            </Heading>
            <Text fontWeight={"medium"} color={"gray.400"}>
              of the year based on total purchase
            </Text>
            <TableContainer
              border={"1px solid"}
              borderColor={"gray.400"}
              rounded="md"
              overflow={"hidden"}
            >
              <Table variant={"striped"}>
                <Thead>
                  <Tr>
                    <Th>Customer ID</Th>
                    <Th>Item Name</Th>
                    <Th>Date</Th>
                    <Th>Sales</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Data</Td>
                    <Td>Product</Td>
                    <Td>Date</Td>
                    <Td>999</Td>
                  </Tr>
                  <Tr>
                    <Td>Data</Td>
                    <Td>Product</Td>
                    <Td>Date</Td>
                    <Td>999</Td>
                  </Tr>
                  <Tr>
                    <Td>Data</Td>
                    <Td>Product</Td>
                    <Td>Date</Td>
                    <Td>999</Td>
                  </Tr>
                  <Tr>
                    <Td>Data</Td>
                    <Td>Product</Td>
                    <Td>Date</Td>
                    <Td>999</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </GridItem>
        <GridItem
          p={"2rem"}
          backgroundColor={"white"}
          color={"blue.900"}
          fontWeight={"bold"}
          rounded={"lg"}
          overflow={"hidden"}
          shadow={"md"}
        >
          <VStack align={"left"} justifyContent={"center"} height="full">
            <Heading size={"lg"} color={"blue.900"}>
              Top Category
            </Heading>
            <Heading size="3xl" mt="1rem">
              {topCategory}
            </Heading>
          </VStack>
        </GridItem>
      </Grid>
    </BaseLayout>
  );
};

export default DashboardPage;
