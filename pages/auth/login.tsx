import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <Heading size={"xl"}>Login to your account</Heading>
      <>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="Username" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" placeholder="Password" />
        </FormControl>
        <Button type="submit" colorScheme="blue" width={"full"}>
          Sign In
        </Button>
        <br />
        <Link href={"#"}>Forgot your password?</Link>
        <p>
          Didn't have an account?{" "}
          <Link href="#" as={"span"}>
            Register now!
          </Link>
        </p>
      </>
    </div>
  );
};

export default LoginPage;
