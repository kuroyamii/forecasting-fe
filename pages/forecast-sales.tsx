import BaseLayout from "@/components/layouts/BaseLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { Field, Form, Formik } from "formik";
import { useId } from "react";

const ForecastPage = () => {
  const initialValue = {
    productName: "",
    month: "",
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  function handleOnSubmit(values: any, action: any) {}
  return (
    <BaseLayout>
      <VStack align={"left"} gap={2} mb={8}>
        <Heading size={"2xl"} color={"blue.900"} mt={4} mb={0}>
          Main Dashboard
        </Heading>
        <Text color={"gray.400"} fontSize={"1rem"}>
          you can forecast upcoming sales of a product on this page
        </Text>
      </VStack>
      <Grid
        templateColumns={"repeat(2,1fr)"}
        gap={8}
        templateRows={"repeat(1,1fr)"}
      >
        <GridItem backgroundColor={"white"} rounded={"lg"} p={8}>
          <Formik initialValues={initialValue} onSubmit={handleOnSubmit}>
            <Form>
              <div className="flex flex-col space-y-4">
                <Field name="productName">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Product Name</FormLabel>
                      <ReactSelect
                        placeholder="Select Product"
                        instanceId={useId()}
                        options={options}
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="month">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Month</FormLabel>
                      <Input type="month" placeholder="Select Month..." />
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme="blue" width="fit-content">
                  Forecast
                </Button>
              </div>
            </Form>
          </Formik>
        </GridItem>
        <GridItem backgroundColor={"white"} rounded={"lg"} p={8}>
          <Box>
            <Heading size={"lg"} color={"blue.900"}>
              Result
            </Heading>
            <Text>the result is based on the superstore dataset</Text>
            <Heading as="p" size={"3xl"} color={"blue.900"} mt={12}>
              USD{0.0}
            </Heading>
          </Box>
        </GridItem>
      </Grid>
    </BaseLayout>
  );
};

export default ForecastPage;
