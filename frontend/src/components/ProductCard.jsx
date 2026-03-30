import { Box, Heading, HStack, IconButton , Text ,Image} from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster"

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");
    const{deleteProduct} =useProductStore()
   

    const handleDeleteProduct = async(pid) => {
        const{success,message}=await deleteProduct(pid)
        if(!success){
                    toaster.create({
                    title: "Error",
                    description: message,
                    status:"error",
                    duration:3000,
                    isClosable: true,
        });
                }else{
                    toaster.create({
                    title: "success",
                    description: message,
                    status:"success",
                    isClosable: true,
                });
            
        }
    }
    
    return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        
        bg={bg}>
        
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
        <Heading as='h3' size='md' mb={4}>
            {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
        </Text>
        <HStack spacing={2}>
  <IconButton aria-label="Edit product" colorScheme="blue">
    <FaEdit />
  </IconButton>

  <IconButton aria-label="Delete product" onClick={()=> handleDeleteProduct(product._id)} colorScheme="red" >
    <MdDelete />
  </IconButton>
</HStack>

        </Box>


    </Box>
    
  )
};
export default ProductCard
