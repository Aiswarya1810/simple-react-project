import { Container, VStack ,Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { SimpleGrid } from "@chakra-ui/react"
import { useProductStore } from '@/store/product';
import ProductCard from '@/components/ProductCard';

const HomePage=() =>{
    const {fetchProducts,products} = useProductStore();

    useEffect(() =>{
        fetchProducts();
    },[fetchProducts]);
    console.log("products",products);


  return (
    <Container maxW='container.xl' py={12} mt={20}>
        <VStack spacing={8}>
            <Text
            fontSize='3xl'
            fontWeight={"bold"}            
            color='blue.500'
            textAlign={"center"}
            >
               Current products 

            </Text>

             <SimpleGrid columns={[1, 2, 3]} 
                gap="40px">
                {/* w= {"full"} */}
                {/* <Box height="20" />
                <Box height="20" />
                <Box height="20" />
                <Box height="20" />
                <Box height="20" /> */}
                {products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </SimpleGrid>
                {products.length ==0 &&(
                    <Text 
                        fontSize='xl'
                        fontWeight={"bold"}
                        color="gray.500"
                        textAlign={"center"}
                        >
                        No Products Found 😭 {" "}
                        <Link to={"/create"}>
                        <Text as='span' color='blue.500' _hover={{textDecoration:"underline"}}>
                            Create a product
                        </Text>
                        </Link>

                    </Text>
                )}
             
           </VStack>
        
    </Container>
    
  )
}

export default HomePage