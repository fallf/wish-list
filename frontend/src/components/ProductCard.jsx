import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import React from "react";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3"
      _hover={{ transform: "translate(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {" "}
          ${product.price}
        </Text>
        <Button
          as={Link}
          href={product.link}
          isExternal // Opens in a new tab
          colorScheme="pink"
          size="sm"
          mb={4}
        >
          View Product
        </Button>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="purple" />
          <IconButton icon={<DeleteIcon />} colorScheme="red" />
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard;
