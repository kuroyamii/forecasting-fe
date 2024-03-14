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

const ProductPage = () => {
  const [products, setProducts] = useState<any>();
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

  return (
    <BaseLayout>
      <Heading size={"2xl"} color={"blue.900"} mt={4} mb={8}>
        Product Summary
      </Heading>
      <TableContainer
        border={"1px solid"}
        borderColor={"gray.400"}
        rounded={"lg"}
        overflow={"hidden"}
      >
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th>Product ID</Th>
              <Th>Product Name</Th>
              <Th>Category</Th>
              <Th>Sub Category</Th>
              <Th>Total Sales</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map(
                (
                  {
                    id,
                    product_name,
                    category,
                    sub_category,
                    total_sales,
                  }: {
                    id: string;
                    product_name: string;
                    category: string;
                    sub_category: string;
                    total_sales: number;
                  },
                  key: any
                ) => (
                  <Tr key={key}>
                    <Td>{id}</Td>
                    <Td>{product_name}</Td>
                    <Td>{category}</Td>
                    <Td>{sub_category}</Td>
                    <Td>{total_sales}</Td>
                  </Tr>
                )
              )}
          </Tbody>
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
