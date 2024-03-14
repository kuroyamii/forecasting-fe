import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div className="w-screen h-screen relative">
      <Image
        className="object-cover"
        src="/bg.png"
        layout="fill"
        alt="background"
      />
    </div>
  );
};

export default Home;
