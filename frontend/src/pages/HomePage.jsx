import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product.js";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, #7928CA, #FF0080 )"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Wishes 💕
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {" "}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No Wishes have been made 😢
          </Text>
        )}

        {products.length === 0 && (
          <Link to="/create">
            <Text
              as="span"
              color="pink.500"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              Create a wish Item
            </Text>
          </Link>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
