import { Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesGrowthSection = ({ salesGrowth }: { salesGrowth: any }) => {
  return (
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
  );
};

export default SalesGrowthSection;
