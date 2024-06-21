import authAPI from "@/service/api/authAPI";
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
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import * as yup from "yup";
import config from "@/service/config/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const LoginPage = () => {
  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState<boolean>(false);
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Please enter your Username"),
    password: yup.string().required("Please enter your password"),
  });
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const [passwordType, setPasswordType] = useState<string>("hidden");
  async function handleOnSubmit(values: any, action: any) {
    onOpen();
    loginMutation.mutate({
      username: values.username,
      password: values.password,
    });
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onError: (data: AxiosError) => {
      setIsLoginError(true);
    },
    onSuccess: (data) => {
      localStorage.setItem("at", data.data.access_token);
      localStorage.setItem("rt", data.data.refresh_token);
      setIsSuccessLogin(true);
      setIsLoginError(false);
      router.push("/dashboard");
    },
  });
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
            Login to your account
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
                <Button type="submit" colorScheme="blue" width={"full"}>
                  Sign In
                </Button>
              </Box>
              {/* <Link href={"#"}>Forgot your password?</Link> */}
              <Text mt={"1rem"}>
                Didn't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-400 font-bold">
                  <Text as="span">Register now!</Text>
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
            Login
          </ModalHeader>
          <ModalBody>
            <Text textAlign={"center"} fontSize={"1.25rem"}>
              {!isSuccessLogin ? (
                <Box>
                  {isLoginError
                    ? "Oops! it seems you've entered wrong username or password"
                    : "Loading..."}
                </Box>
              ) : (
                <Text mb={"2rem"}>
                  "Logged in successfully! Redirecting..."
                </Text>
              )}
            </Text>
          </ModalBody>
          {isLoginError && (
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

export default LoginPage;
