// /* eslint-disable no-unused-vars */
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputRightElement,
//   VStack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { useToast } from '@chakra-ui/react'
// import axios from "axios"
// import {useHistory} from "react-router-dom"

// const Login = () => {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const history = useHistory();
//   const handleClick = () => setShow(!show);

//   const submitHandler = async () => {
//     // console.log("Submit handler called");
//     setLoading(true)
//     if( !email || !password){
//       toast({
//         title: 'Please Fill all the Fields',
//         status: 'warning',
//         duration: 3000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       setLoading(false)
//       return
//     }
//     //api request to store the below in daatbase
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//       const {data}  =  await axios.post("/api/user/login", {email,password},config)
//       toast({
//         title: 'Login Succesful',
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       localStorage.setItem('userInfo', JSON.stringify(data))
//       setLoading(false)
//       //if user has successfully logged in we push him to chats page
//       history.push('/chats')
//     } catch (error) {
//       // console.log("Error response:", error.response);
//       toast({
//         title: 'Error Occured!',
//         description:error.response.data.message,
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       setLoading(false)
//     }
//   }

//   return (
//     <VStack spacing="5px">
     
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//         value={email}
//           placeholder="Enter Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//           value={password}
//             focusBorderColor="blue.400"
//             type={show ? "text" : "password"}
//             placeholder="Enter Your Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       <Button
//         colorScheme="red"
//         variant="solid"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={() => {
//             setEmail("guest@example.com")
//             setPassword("123456")
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };
// export default Login;


/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Icon,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import axios from "axios"
import {useHistory} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
        toast({
            title: "Please Fill all the Fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        return;
    }

    try {
        // Clear any existing session data first
        localStorage.clear();
        sessionStorage.clear();
        
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
        );

        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        
        // Force complete page reload
        window.location.href = "/chats";
        
    } catch (error) {
        toast({
            title: "Error Occurred!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
    }
  }

  return (
    <VStack spacing="6" p={4}>
      {/* <Text 
        fontSize="lg" 
        color="cyan.400" 
        fontFamily="'Fira Code', monospace"
        textAlign="center"
        mb={2}
      >
        {"// Access your chat space"}
      </Text> */}

      <FormControl id="email" isRequired>
        <FormLabel 
          color="gray.300" 
          fontFamily="'Fira Code', monospace"
          fontSize="sm"
        >
          <Flex align="center" gap={2}>
            <Icon as={FaUser} color="cyan.400" />
            Email Address
          </Flex>
        </FormLabel>
        <Input
          value={email}
          placeholder="user@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          bg="gray.700"
          border="1px solid"
          borderColor="gray.600"
          color="white"
          fontFamily="'Fira Code', monospace"
          _hover={{
            borderColor: "cyan.400"
          }}
          _focus={{
            borderColor: "cyan.400",
            boxShadow: "0 0 0 1px #00D4FF"
          }}
          _placeholder={{
            color: "gray.400"
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel 
          color="gray.300" 
          fontFamily="'Fira Code', monospace"
          fontSize="sm"
        >
          <Flex align="center" gap={2}>
            <Icon as={FaLock} color="green.400" />
            Password
          </Flex>
        </FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.700"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            fontFamily="'Fira Code', monospace"
            _hover={{
              borderColor: "cyan.400"
            }}
            _focus={{
              borderColor: "cyan.400",
              boxShadow: "0 0 0 1px #00D4FF"
            }}
            _placeholder={{
              color: "gray.400"
            }}
          />
          <InputRightElement>
            <Button 
              h="1.75rem" 
              size="sm" 
              onClick={handleClick}
              bg="transparent"
              color="gray.400"
              _hover={{
                color: "cyan.400",
                bg: "gray.600"
              }}
            >
              <Icon as={show ? FaEyeSlash : FaEye} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        bgGradient="linear(to-r, cyan.400, blue.500)"
        color="white"
        width="100%"
        mt={6}
        onClick={submitHandler}
        isLoading={loading}
        fontFamily="'Fira Code', monospace"
        fontWeight="bold"
        _hover={{
          bgGradient: "linear(to-r, cyan.300, blue.400)",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(0, 212, 255, 0.3)"
        }}
        _active={{
          transform: "translateY(0px)"
        }}
      >
        {"{ Login }"}
      </Button>
      
      <Button
        bg="gray.600"
        color="white"
        variant="solid"
        width="100%"
        fontFamily="'Fira Code', monospace"
        border="1px solid"
        borderColor="orange.400"
        _hover={{
          bg: "orange.500",
          borderColor: "orange.300",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(255, 165, 0, 0.3)"
        }}
        onClick={() => {
          setEmail("guest@gmail.com")
          setPassword("123456")
        }}
      >
        {"// Get Demo Credentials"}
      </Button>
    </VStack>
  );
};
export default Login;