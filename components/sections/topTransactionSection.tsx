import { TransactionType } from "@/lib/types/product";
import dayjs from "dayjs";
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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import DashboardHeading from "../typography/dashboardHeading";

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

const TopTransactionSection = ({
  topTransaction = [],
}: {
  topTransaction: any;
}) => {
  const columns: ColumnDef<TransactionType>[] = [
    {
      header: "Customer ID",
      accessorKey: "customer_id",
      id: "customer_id",
      size: 16 * 2,
    },
    {
      header: "Item Name",
      accessorKey: "product_name",
      id: "product_name",
      size: 256,
    },
    {
      header: "Date",
      accessorKey: "order_date",
      id: "order_date",
      accessorFn: (row, index) => {
        return dayjs(row.order_date).format("ddd, DD MMMM YYYY");
      },
    },
    {
      header: "Sales",
      accessorKey: "sales",
      id: "sales",
    },
  ];

  const table = useReactTable({
    data: topTransaction,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <VStack align={"left"}>
      <DashboardHeading>Top Transaction</DashboardHeading>
      <Text fontWeight={"medium"} color={"gray.400"}>
        of the year based on total purchase
      </Text>
      <TableContainer
        border={"1px solid"}
        borderColor={"gray.400"}
        rounded="md"
        overflow={"hidden"}
      >
        <Table
          variant={"striped"}
          css={{ tableLayout: "fixed", width: "full" }}
          whiteSpace={"break-spaces"}
          fontSize={{ base: "12px", "2xl": "16px" }}
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} w={header.getSize()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default TopTransactionSection;
