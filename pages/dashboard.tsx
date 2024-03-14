import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import BaseLayout from "@/components/layouts/BaseLayout";
import dashboardAPI from "@/service/api/dashboardAPI";

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
import { useEffect, useState } from "react";
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
  const monthMap: any = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Des",
  };
  const [topCategory, setTopCategory] = useState<any>("");
  const [totalProduct, setTotalProduct] = useState<any>(0);
  const [salesGrowth, setSalesGrowth] = useState<any>();
  const [topTransaction, setTopTransaction] = useState<any>();

  useEffect(() => {
    const at = localStorage.getItem("at");
    (async () => {
      if (at) {
        const res: any = await dashboardAPI.getSalesGrowth(12, at);
        const data = res.data.data;
        if (data) {
          let result = [];
          let temp;
          for (let item of data) {
            temp = {
              label: `${monthMap[item.month]} ${item.year}`,
              sales: item.sum,
            };
            result.push(temp);
          }
          setSalesGrowth(result.reverse());
        }
      }
    })();
    (async () => {
      if (at) {
        const res: any = await dashboardAPI.getTotalProduct(at);
        if (res.data) {
          setTotalProduct(res.data);
        }
      }
    })();
    (async () => {
      if (at) {
        const res: any = await dashboardAPI.getTopCategory(at);
        if (res.data) {
          setTopCategory(res.data);
        }
      }
    })();
    (async () => {
      if (at) {
        const res: any = await dashboardAPI.getTopTransaction(4, at);

        if (res.data) {
          setTopTransaction(res.data);
        }
      }
    })();
  }, []);

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
            data={salesGrowth}
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
              dataKey="sales"
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
                  {topTransaction?.map(
                    (
                      {
                        customer_id,
                        order_date,
                        product_name,
                        sales,
                      }: {
                        customer_id: string;
                        order_date: any;
                        product_name: string;
                        sales: number;
                      },
                      key: any
                    ) => {
                      let od = new Date(order_date);
                      let trail = product_name.length > 40 ? "..." : "";
                      return (
                        <Tr key={key}>
                          <Td>{customer_id}</Td>
                          <Td>{`${product_name.substring(0, 40)}${trail}`}</Td>
                          <Td>{`${od.getDate()} ${
                            monthMap[od.getMonth()]
                          } ${od.getFullYear()}`}</Td>
                          <Td>{sales}</Td>
                        </Tr>
                      );
                    }
                  )}
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
            <Heading size="2xl" mt="1rem">
              {topCategory}
            </Heading>
          </VStack>
        </GridItem>
      </Grid>
    </BaseLayout>
  );
};

export default DashboardPage;
