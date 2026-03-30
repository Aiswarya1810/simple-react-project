import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  Image,
  VStack,
  Button,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();

const [showPopup, setShowPopup] = useState(false);  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
  };

  const handleEditClick = () => {
  setUpdatedProduct({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  setShowPopup(true);
};

const handleClosePopup = () => {
  setShowPopup(false);
};

const handleUpdateProduct = async(pid, updatedProduct)=> {
    await updateProduct(pid,updatedProduct);
    handleClosePopup();;
}

  return (
    <Box
      position="relative"
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
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
        <Heading as="h3" size="md" mb={4}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
  aria-label="Edit product"
  onClick={handleEditClick}
  colorScheme="blue"
>
  <FaEdit />
</IconButton>

          <IconButton
            aria-label="Delete product"
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>

      <Portal>
  {showPopup && (
    <Box
      position="fixed"
      inset="0"
      bg="rgba(0,0,0,0.6)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box
        bg="gray.800"
        color="white"
        p={6}
        borderRadius="lg"
        boxShadow="2xl"
        minW="350px"
      >
        <HStack justify="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Update Product
          </Text>
          <Text cursor="pointer" onClick={handleClosePopup} fontSize="lg">
            ×
          </Text>
        </HStack>

        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                name: e.target.value,
              })
            }
          />

          <Input
            placeholder="Price"
            type="number"
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                price: e.target.value,
              })
            }
          />

          <Input
            placeholder="Image URL"
            value={updatedProduct.image}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                image: e.target.value,
              })
            }
          />

          <HStack w="full" justify="flex-end">
            <Button size="sm" colorScheme="blue" onClick= {()=> handleUpdateProduct(product._id,updatedProduct)}>
             
              Update
            </Button>
            <Button size="sm" variant="ghost" onClick={handleClosePopup}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )}
</Portal>
    
    </Box>
  );
};

export default ProductCard;