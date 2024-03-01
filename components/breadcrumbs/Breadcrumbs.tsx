import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";

const Breadcrumbs = ({ paths }: { paths: string[] }) => {
  return (
    <Breadcrumb
      spacing="8px"
      separator={"/"}
      fontSize={"1.5rem"}
      fontWeight={"medium"}
      color="black"
    >
      <BreadcrumbItem>
        <Text>Pages</Text>
      </BreadcrumbItem>
      {paths.map((path, index) => {
        // Process the path so it can be used on the breadcrumbs
        let tempPath = path.split("-");
        tempPath.forEach(function (item, index, arr) {
          let newItem = item[0].toUpperCase().concat(item.slice(1));
          arr[index] = newItem;
        });
        path = tempPath.join(" ");
        return (
          <BreadcrumbItem key={index}>
            <Text>{path}</Text>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
