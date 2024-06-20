import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import BaseLayout from "@/components/layouts/BaseLayout";
import SalesGrowthSection from "@/components/sections/salesGrowthSection";
import TopCategorySection from "@/components/sections/topCategorySection";
import TopTransactionSection, {
  MonthMap,
} from "@/components/sections/topTransactionSection";
import TotalProductSection from "@/components/sections/totalProductSection";
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
              label: `${MonthMap[item.month]} ${item.year}`,
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

  const sections = [
    {
      rowSpan: 1,
      colSpan: 1,
      component: <TotalProductSection totalProduct={totalProduct} />,
    },
    {
      rowSpan: 2,
      colSpan: 2,
      component: <TopTransactionSection topTransaction={topTransaction} />,
    },
    {
      rowSpan: 1,
      colSpan: 1,
      component: <TopCategorySection topCategory={topCategory} />,
    },
  ];

  const router = useRouter();

  return (
    <BaseLayout>
      <Heading size={"2xl"} color={"blue.900"} mt={4} mb={8}>
        Main Dashboard
      </Heading>

      <SalesGrowthSection salesGrowth={salesGrowth} />

      <Grid
        templateRows={"repeat(2,1fr)"}
        templateColumns={"repeat(3,1fr)"}
        w={"full"}
        h="fit-content"
        gap={4}
        mt={4}
      >
        {sections.map(({ rowSpan, colSpan, component }, idx) => (
          <GridItem
            backgroundColor={"white"}
            color={"blue.900"}
            fontWeight={"bold"}
            rounded={"lg"}
            overflow={"hidden"}
            shadow={"md"}
            p={"2rem"}
            rowSpan={rowSpan}
            colSpan={colSpan}
          >
            {component}
          </GridItem>
        ))}
      </Grid>
    </BaseLayout>
  );
};

export default DashboardPage;
