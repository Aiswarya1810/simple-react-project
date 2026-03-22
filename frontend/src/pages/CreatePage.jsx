import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Button, Container, VStack, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'

function CreatePage() {
    const[newProduct, setNewProduct]= useState({
        name:"",
        price:"",
        image:"",
    });
const handleAddProduct =() => {
    console.log(newProduct)};


  return <Container maxW={"container.sm"}>
    <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create new Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white","gray.800")}
         p={6} rounded={"lg"} shadow={"md"}>

        <VStack spacing={4}>
            <input 
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) =>setNewProduct({ ...newProduct,name: e.target.value})
            }/>

            <input 
            placeholder='Price'
            name='Price'
            type='number'
            value={newProduct.price}
            onChange={(e) =>setNewProduct({ ...newProduct,price: e.target.value})
            }/>

            <input 
            placeholder='Image url'
            name='image'
            value={newProduct.image}
            onChange={(e) =>setNewProduct({ ...newProduct,image: e.target.value})
            }/>


<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
    Add Product
</Button>

        </VStack>
         </Box>
    </VStack>


  </Container>
  
};

export default CreatePage;