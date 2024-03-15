import BaseLayout from "@/components/layouts/BaseLayout";
import authAPI from "@/service/api/authAPI";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { jwtDecode } from "jwt-decode";
import { useEffect, useId, useState } from "react";
import ReactSelect from "react-select";
import { FaCheckCircle } from "react-icons/fa";
import * as yup from "yup";
import { MdError } from "react-icons/md";

const InviteAdmin = () => {
  const initialValue = {
    email: "",
    role: "",
  };
  const roles = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "super_admin",
      label: "Super Admin",
    },
  ];
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter proper email")
      .required("Please enter the email"),
    role: yup.string().required("Please select the role"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [isError, setIsError] = useState(false);

  async function handleOnSubmit(values: any, actions: any) {
    setIsError(false);
    let at = localStorage.getItem("at");
    if (at) {
      let jwt: any = jwtDecode(at);
      if (jwt.data.role_id === 2) {
        onOpen();
        setIsLoading(true);
        const res = await authAPI.inviteAdmin(values.email, values.role, at);

        if (res.code >= 200 && res.code < 300) {
          setIsLoading(false);
          setIsError(false);
        } else {
          setIsError(true);
        }
      }
    } else {
      setIsError(true);
    }
  }
  return (
    <>
      <BaseLayout>
        <VStack align={"left"} gap={2} mb={8}>
          <Heading size={"2xl"} color={"blue.900"} mt={4} mb={0}>
            Invite Admin
          </Heading>
          <Text color={"gray.400"} fontSize={"1rem"}>
            you can add an admin with your desired role
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
                  <Field name="email">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="role">
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl>
                        <FormLabel>Role</FormLabel>
                        <ReactSelect
                          name="role"
                          placeholder="Select Role"
                          instanceId={useId()}
                          options={roles}
                          onChange={(value: any) => {
                            form?.setFieldValue("role", value.value);
                          }}
                          // value={form.values.product_id}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button colorScheme="blue" width="fit-content" type="submit">
                    Invite
                  </Button>
                </div>
              </Form>
            </Formik>
          </GridItem>
        </Grid>
      </BaseLayout>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent minWidth={"40vw"} p={8}>
          <ModalCloseButton />
          <ModalHeader textAlign={"center"}>
            <Heading>
              {!isError
                ? isLoading
                  ? "Loading..."
                  : "Done"
                : "Something went wrong"}
            </Heading>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            width={"100%"}
            mt={"2rem"}
          >
            {isError === false ? (
              isLoading === true ? (
                <Spinner width={"10rem"} height="10rem" thickness="0.5rem" />
              ) : (
                <Text color={"green.400"}>
                  <FaCheckCircle size={"10rem"} />
                </Text>
              )
            ) : (
              <Text color={"red.400"}>
                <MdError size={"10rem"} />
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteAdmin;
