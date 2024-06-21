import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import authAPI from "@/service/api/authAPI";
import config from "@/service/config/config";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import * as yup from "yup";

const SignupPage = () => {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("hidden");
  const [isSuccessSignUp, setIsSuccessSignUp] = useState<boolean>(false);
  const [isSignUpError, setIsSignUpError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const initialValues = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    admin_code: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Please enter an unique username"),
    email: yup
      .string()
      .email("Please enter the right email format")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    first_name: yup.string().required("Please enter your first name"),
    last_name: yup.string().required("Please enter your last name"),
    admin_code: yup.string().required("Please enter your admin code"),
  });
  const signUpMutation = useMutation({
    mutationFn: authAPI.signup,
    onError: (data: AxiosError<any>) => {
      if (data.response?.data?.errors.value === "username or email is used") {
        setErrorMessage(
          "Someone has already used this username or email. Please use other username or email!"
        );
      } else {
        setErrorMessage(
          "it seems you've entered wrong data. Please make sure you've entered the right data or code!"
        );
      }
      setIsSignUpError(true);
    },
    onSuccess: (data) => {
      setIsSuccessSignUp(true);
      setIsSignUpError(false);
      router.push("/auth/login");
    },
  });
  const axiosPrivate = useAxiosPrivate();
  function refreshTokens() {
    // Refresh token
    const rt: any = localStorage.getItem("rt");
    const at: any = localStorage.getItem("at");
    if (rt) {
      let refreshToken = jwtDecode(rt);
      if (refreshToken.exp) {
        let expDate = new Date(refreshToken.exp * 1000);
        let exp = Date.parse(expDate.toISOString());
        let now = Date.now();
        if (exp - now > 0) {
          (async () => {
            const res = await authAPI.refreshToken(axiosPrivate);
            if (res.data) {
              localStorage.setItem("at", res.data.access_token);
              localStorage.setItem("rt", res.data.refresh_token);
              router.push("/dashboard");
            }
          })();
        } else {
          localStorage.removeItem("at");
          localStorage.removeItem("rt");
        }
      }
    }
  }
  useEffect(() => {
    refreshTokens();
    const interval = setInterval(refreshTokens, config.refreshDuration);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function handleOnSubmit(values: any, actions: any) {
    onOpen();

    signUpMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      admin_code: values.admin_code,
    });
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Grid templateColumns={"repeat(2,1fr)"} placeItems={"center"}>
        <GridItem
          display={"grid"}
          justifyItems={"center"}
          gridTemplateColumns={"repeat(1,1fr)"}
          gap="1rem"
        >
          <Heading size={"2xl"} maxW={"20rem"} textAlign={"center"}>
            Create your own account
          </Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Box
                width="25rem"
                display={"grid"}
                gridTemplateColumns={"repeat(1,1fr)"}
                gap="1.5rem"
              >
                <Field name="username">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input
                        name="username"
                        placeholder="Username"
                        {...field}
                        borderColor={
                          form.errors.username ? "red.400" : "gray.200"
                        }
                        _hover={{
                          borderColor: form.errors.username
                            ? "red.400"
                            : "gray.200",
                        }}
                      />
                      {form.errors.username && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.username}
                        </FormHelperText>
                      )}
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
                        borderColor={form.errors.email ? "red.400" : "gray.200"}
                        _hover={{
                          borderColor: form.errors.email
                            ? "red.400"
                            : "gray.200",
                        }}
                        {...field}
                      />
                      {form.errors.email && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          name="password"
                          placeholder="Password"
                          type={passwordType == "hidden" ? "password" : "text"}
                          borderColor={
                            form.errors.password ? "red.400" : "gray.200"
                          }
                          _hover={{
                            borderColor: form.errors.password
                              ? "red.400"
                              : "gray.200",
                          }}
                          {...field}
                        />
                        <InputRightElement>
                          <IconButton
                            onClick={() => {
                              if (passwordType == "hidden") {
                                setPasswordType("show");
                              } else {
                                setPasswordType("hidden");
                              }
                            }}
                            border={"none"}
                            isRound={true}
                            variant={"outline"}
                            colorScheme="black"
                            icon={
                              passwordType == "hidden" ? (
                                <FaEye />
                              ) : (
                                <IoEyeOff />
                              )
                            }
                            fontSize={"16px"}
                            aria-label={
                              passwordType == "hidden"
                                ? "Show Password"
                                : "Hide Password"
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      {form.errors.password && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="first_name">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        name="first_name"
                        placeholder="First Name"
                        borderColor={
                          form.errors.first_name ? "red.400" : "gray.200"
                        }
                        _hover={{
                          borderColor: form.errors.first_name
                            ? "red.400"
                            : "gray.200",
                        }}
                        {...field}
                      />
                      {form.errors.first_name && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.first_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="last_name">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        name="last_name"
                        placeholder="Last Name"
                        borderColor={
                          form.errors.last_name ? "red.400" : "gray.200"
                        }
                        _hover={{
                          borderColor: form.errors.last_name
                            ? "red.400"
                            : "gray.200",
                        }}
                        {...field}
                      />
                      {form.errors.last_name && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.last_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Field name="admin_code">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl>
                      <FormLabel>Admin Invitation Code</FormLabel>
                      <Input
                        name="admin_code"
                        placeholder="Admin Invitation Code"
                        borderColor={
                          form.errors.admin_code ? "red.400" : "gray.200"
                        }
                        _hover={{
                          borderColor: form.errors.admin_code
                            ? "red.400"
                            : "gray.200",
                        }}
                        {...field}
                      />
                      {form.errors.admin_code && (
                        <FormHelperText
                          color={"red.400"}
                          pos={"absolute"}
                          mt={0}
                        >
                          {form.errors.admin_code}
                        </FormHelperText>
                      )}
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
                <Link href="/auth/login" className="text-blue-400 font-bold">
                  <Text as={"span"}>Login now!</Text>
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
      <Modal isOpen={isOpen} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontSize={"2rem"}>
            Sign Up
          </ModalHeader>
          <ModalBody>
            <Text textAlign={"center"} fontSize={"1.25rem"}>
              {!isSuccessSignUp ? (
                <Box>
                  {isSignUpError ? `Oops! ${errorMessage}` : "Loading..."}
                </Box>
              ) : (
                <Text mb={"2rem"}>Signed up successfully! Redirecting...</Text>
              )}
            </Text>
          </ModalBody>
          {isSignUpError && (
            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignupPage;
