import {
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
import React from "react";

export const MonthMap: any = {
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

const TopTransactionSection = ({ topTransaction }: { topTransaction: any }) => {
  return (
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
                      MonthMap[od.getMonth()]
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
  );
};

export default TopTransactionSection;
