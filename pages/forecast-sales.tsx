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
import { useEffect, useId, useState } from "react";
import forecastAPI from "@/service/api/forecastAPI";
import * as yup from "yup";

const ForecastPage = () => {
  const initialValue = {
    product_id: "",
    month: "",
  };

  const [products, setProducts] = useState<any>();
  const [result, setResult] = useState<any>(0);
  useEffect(() => {
    const at = localStorage.getItem("at");

    (async () => {
      if (at) {
        const res = await forecastAPI.getProducts(at);
        if (res.data) {
          let result = [];
          for (let item of res.data) {
            result.push({ value: item.id, label: item.name });
          }
          setProducts(result);
        }
      }
    })();
  }, []);

  async function handleOnSubmit(values: any, action: any) {
    let date = values.month.split("-");
    let month = parseInt(date[1]);
    let year = parseInt(date[0]);

    const at = localStorage.getItem("at");
    if (at) {
      const res: any = await forecastAPI.forecastSales(
        month,
        year,
        values.product_id,
        at
      );
      if (res) {
        setResult(res.data);
      }
    }
  }

  const validationSchema = yup.object().shape({
    month: yup.string().required("Pick the desired month"),
    product_id: yup.string().required("Select product"),
  });

  return (
    <BaseLayout>
      <VStack align={"left"} gap={2} mb={8}>
        <Heading size={"2xl"} color={"blue.900"} mt={4} mb={0}>
          Forecast Sales
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
          <Formik
            initialValues={initialValue}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="flex flex-col space-y-4">
                <Field name="product_id">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Product Name</FormLabel>
                      <ReactSelect
                        name="product_id"
                        placeholder="Select Product"
                        instanceId={useId()}
                        options={products}
                        onChange={(value: any) => {
                          form?.setFieldValue("product_id", value.value);
                        }}
                        // value={form.values.product_id}
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="month">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Month</FormLabel>
                      <Input
                        name="month"
                        type="month"
                        placeholder="Select Month..."
                        {...field}
                      />
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme="blue" width="fit-content" type="submit">
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
              <Text as="span">USD</Text>
              <Text as="span" ml={4}>
                {result ? result.result.toFixed(5) : 0}
              </Text>
            </Heading>
          </Box>
        </GridItem>
      </Grid>
    </BaseLayout>
  );
};

export default ForecastPage;
