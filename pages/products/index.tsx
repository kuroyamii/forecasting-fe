import BaseLayout from "@/components/layouts/BaseLayout";
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
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

const ProductPage = () => {
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
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
            <Tr>
              <Td>PROD-01</Td>
              <Td>Product</Td>
              <Td>Category</Td>
              <Td>Sub Category</Td>
              <Td>10000</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <ReactPaginate
        nextLabel="next"
        previousLabel="prev"
        pageRangeDisplayed={5}
        pageCount={5}
        onPageChange={undefined}
      />
    </BaseLayout>
  );
};

export default ProductPage;
