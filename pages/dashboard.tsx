import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import BaseLayout from "@/components/layouts/BaseLayout";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <BaseLayout>
      <div></div>
    </BaseLayout>
  );
};

export default DashboardPage;
