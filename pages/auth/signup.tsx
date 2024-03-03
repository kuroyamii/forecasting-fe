import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";

const SignupPage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
    adminCode: "",
  };
  return (
    <Grid templateColumns={"repeat(2,1fr)"} placeItems={"center"}>
      <GridItem
        display={"grid"}
        justifyItems={"center"}
        gridTemplateColumns={"repeat(1,1fr)"}
        gap="1rem"
      >
        <Heading size={"2xl"} maxW={"20rem"} textAlign={"center"}>
          Login to your account
        </Heading>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <Form>
            <Box
              width="25rem"
              display={"grid"}
              gridTemplateColumns={"repeat(1,1fr)"}
              gap="1rem"
            >
              <Field name="username">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input name="username" placeholder="Username" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="name">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input name="name" placeholder="Full Name" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="adminCode">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl>
                    <FormLabel>Admin Invitation Code (optional)</FormLabel>
                    <Input
                      name="adminCode"
                      placeholder="Admin Invitation Code"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>

              <Button type="submit" colorScheme="blue" width={"full"}>
                Register Now
              </Button>
            </Box>
            {/* <Link href={"#"}>Forgot your password?</Link> */}
            <Text mt={"1rem"}>
              Already have an account?{" "}
              <Link href="#" as={"span"} className="text-blue-400 font-bold">
                Login now!
              </Link>
            </Text>
          </Form>
        </Formik>
      </GridItem>
      <GridItem pos={"relative"} width={"full"} height="100vh">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src="/bg.png"
          alt="background"
        />
      </GridItem>
    </Grid>
  );
};

export default SignupPage;
