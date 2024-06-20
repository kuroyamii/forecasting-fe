import BaseLayout from "@/components/layouts/BaseLayout";
import productAPI from "@/service/api/productAPI";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import QueryString from "qs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductResponseType } from "@/lib/types/product";
import PageTitle from "@/components/typography/pageTitle";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductResponseType[]>([]);
  const [metadata, setMetadata] = useState<any>();
  const router = useRouter();
  const { limit, page } = router.query;
  function handlePageClick(e: { selected: any }) {
    if (router.isReady) {
      router.replace({
        pathname: "/products",
        query: {
          ...router.query,
          page: e.selected + 1,
        },
      });
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const at = localStorage.getItem("at");

      if (at) {
        (async () => {
          const res = await productAPI.getProductSummaries(
            typeof page == "string" ? page : "1",
            typeof limit == "string" ? limit : "10",
            at
          );
          if (res.data) {
            setProducts(res.data.data);
            setMetadata(res.data.metadata);
          }
        })();
      }
    }
  }, [router.query]);

  const columns: ColumnDef<ProductResponseType>[] = [
    {
      header: "ID",
      accessorKey: "id",
      id: "id",
    },
    {
      header: "Product Name",
      accessorKey: "product_name",
      id: "product_name",
      size: 400,
    },
    {
      header: "Sub Category",
      accessorKey: "sub_category",
      id: "sub_category",
    },
    {
      header: "Category",
      accessorKey: "category",
      id: "category",
    },
    {
      header: "Total Sales",
      accessorKey: "total_sales",
      id: "total_sales",
    },
  ];
  const table = useReactTable({
    data: products,
    columns: columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <BaseLayout>
      <PageTitle>Product Summary</PageTitle>
      <TableContainer
        border={"1px solid"}
        borderColor={"gray.400"}
        rounded={"lg"}
        overflow={"hidden"}
      >
        <Table
          variant={"striped"}
          __css={{ "table-layout": "fixed", width: "full" }}
          whiteSpace={"break-spaces"}
        >
          {table && (
            <>
              <Thead>
                {table.getHeaderGroups().map((headerGroups) => (
                  <Tr key={headerGroups.id}>
                    {headerGroups.headers.map((header) => (
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
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </>
          )}
        </Table>
      </TableContainer>
      {/* <p className=" basis"></p> */}
      <VStack w={"full"} align="center" mt={"2rem"}>
        {metadata && (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<IoIosArrowForward />}
            previousLabel={<IoIosArrowBack />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={metadata.pages}
            pageClassName="active:text-blue-400"
            pageLinkClassName="py-1 px-2 hover:bg-blue-100 rounded-full transition-all duration-300"
            previousClassName="text-black bg-[#F2F2F2] p-2 rounded-full"
            nextClassName="text-black bg-[#F2F2F2] p-2 rounded-full"
            breakClassName="text-black"
            containerClassName="flex basis-0 space-x-2 items-center"
            activeClassName="text-blue-400 bg-blue-100 rounded-full p-1"
            renderOnZeroPageCount={null}
          />
        )}
      </VStack>
    </BaseLayout>
  );
};

export default ProductPage;
