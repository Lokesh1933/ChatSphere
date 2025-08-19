// /* eslint-disable no-unused-vars */
// import {
//     Button,
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

// const Signup = () => {
//   const [name, setName] = useState();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [confirmpassword, setConfirmPassword] = useState();
//   const [pic, setPic] = useState();
//   const [loading,setLoading] = useState(false)
//   const [show, setShow] = useState(false)

//   const toast = useToast()
//   const history = useHistory()
//   const handleClick = () => setShow(!show)
//   const postDetails = (pics) => {
//     setLoading(true)
//     if(pics === undefined){
//       toast({
//         title: 'Please Select An Image!',
//         status: 'warning',
//         duration: 3000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       return
//     }
//     if(pics.type === "image/jpeg" || pics.type === "image/png"){
//       const data = new FormData()
//       data.append("file",pics)
//       data.append("upload_preset","ChatSphere")
//       data.append("cloud_name","dlyywgd5s")
//       // axios.post("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload", data)
//       fetch("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload", {
//         method: "POST",
//         body: data,
//       })
//         // .then((response) => response.json())
//         // .then((data) => {
//         //   setPic(data.url.toString());
//         //   console.log(data.url.toString());
//         //   setLoading(false);
//         // })
//       .then((res) => res.json())
//         .then(data => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
//           setLoading(false);
//           toast({
//             status: "success",
//             title: "Image uploaded successfully!",
//             isClosable: true,
//             duration: 5000,
//             position: "bottom",
//           });
//         })
//       // .then((response) => {
//       //   setPic(response.data.url.toString());
//       //   setLoading(false);
//       //   toast({
//       //     title: "Image uploaded successfully!",
//       //     status: "success",
//       //     duration: 5000,
//       //     isClosable: true,
//       //     position: "bottom",
//       //   });
//       // })
//       .catch((error) => {
//         console.log("Cloudinary error:", error);
//         setLoading(false);
//       });
//     } else {
//       toast({
//         title: 'Please Select An Image!',
//         status: 'warning',
//         duration: 5000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       setLoading(false)
//       return
//     }
//   }
//   const submitHandler = async () => {
//     // console.log("Submit handler called");
//     setLoading(true)
//     if(!name || !email || !password || !confirmpassword){
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
//     if(password !== confirmpassword){
//       toast({
//         title: 'Passwords Do Not Match',
//         status: 'warning',
//         duration: 3000,
//         isClosable: true,
//         position: 'bottom',
//       })
//       return
//     }
//     //api request to store the below in daatbase
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//       const {data}  =  await axios.post("/api/user", {name,email,password,pic},config)
//       toast({
//         title: 'Registration Succesful',
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
//     <form
//     onSubmit={(e) => {
//       e.preventDefault();
//       submitHandler();
//     }}
//     style={{ width: "100%" }}
//   >
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             focusBorderColor='blue.400'
//             type={show?"text":"password"}
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

//       <FormControl id="password" isRequired>
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup size='md'>
//           <Input
//             focusBorderColor='blue.400'
//             type={show?"text":"password"}
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="pic">
//         <FormLabel>Upload Your Picture</FormLabel>
//         <InputGroup>
//           <Input
            
//             type="file"
//             p={1.5}
//             accept="image/*"
            
//             onChange={(e) => postDetails(e.target.files[0])}
//           />
          
//         </InputGroup>
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{marginTop: 15}}
//         // onClick={submitHandler} //added it in the form better to handle submit there
//         type="submit"
//         isLoading={loading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//     </form>
//   );
// };

// export default Signup;

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
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaImage } from "react-icons/fa";
import axios from "axios"
import {useHistory} from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading,setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const toast = useToast()
  const history = useHistory()
  const handleClick = () => setShow(!show)
  
  const postDetails = (pics) => {
    setLoading(true)
    if(pics === undefined){
      toast({
        title: 'Please Select An Image!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData()
      data.append("file",pics)
      data.append("upload_preset","ChatSphere")
      data.append("cloud_name","dlyywgd5s")
      
      fetch("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload", {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
        .then(data => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
          toast({
            status: "success",
            title: "Image uploaded successfully!",
            isClosable: true,
            duration: 5000,
            position: "bottom",
          });
        })
      .catch((error) => {
        console.log("Cloudinary error:", error);
        setLoading(false);
      });
    } else {
      toast({
        title: 'Please Select An Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }
  }
  
 const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
        toast({
            title: "Passwords Do Not Match",
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
            "/api/user",
            { name, email, password, pic },
            config
        );

        toast({
            title: "Registration Successful",
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
};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      style={{ width: "100%" }}
    >
      <VStack spacing="5" p={4}>
        {/* <Text 
          fontSize="lg" 
          color="cyan.400" 
          fontFamily="'Fira Code', monospace"
          textAlign="center"
          mb={2}
        >
          {"// Create your account"}
        </Text> */}

        <FormControl id="first-name" isRequired>
          <FormLabel 
            color="gray.300" 
            fontFamily="'Fira Code', monospace"
            fontSize="sm"
          >
            <Flex align="center" gap={2}>
              <Icon as={FaUser} color="purple.400" />
              Display Name
            </Flex>
          </FormLabel>
          <Input
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
            bg="gray.700"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            fontFamily="'Fira Code', monospace"
            _hover={{ borderColor: "purple.400" }}
            _focus={{ borderColor: "purple.400", boxShadow: "0 0 0 1px #9F7AEA" }}
            _placeholder={{ color: "gray.400" }}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel 
            color="gray.300" 
            fontFamily="'Fira Code', monospace"
            fontSize="sm"
          >
            <Flex align="center" gap={2}>
              <Icon as={FaEnvelope} color="cyan.400" />
              Email Address
            </Flex>
          </FormLabel>
          <Input
            placeholder="user@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.700"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            fontFamily="'Fira Code', monospace"
            _hover={{ borderColor: "cyan.400" }}
            _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px #00D4FF" }}
            _placeholder={{ color: "gray.400" }}
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
              type={show?"text":"password"}
              placeholder="Create a secure password"
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              border="1px solid"
              borderColor="gray.600"
              color="white"
              fontFamily="'Fira Code', monospace"
              _hover={{ borderColor: "green.400" }}
              _focus={{ borderColor: "green.400", boxShadow: "0 0 0 1px #48BB78" }}
              _placeholder={{ color: "gray.400" }}
            />
            <InputRightElement>
              <Button 
                h="1.75rem" 
                size="sm" 
                onClick={handleClick}
                bg="transparent"
                color="gray.400"
                _hover={{ color: "green.400", bg: "gray.600" }}
              >
                <Icon as={show ? FaEyeSlash : FaEye} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirm-password" isRequired>
          <FormLabel 
            color="gray.300" 
            fontFamily="'Fira Code', monospace"
            fontSize="sm"
          >
            <Flex align="center" gap={2}>
              <Icon as={FaLock} color="orange.400" />
              Confirm Password
            </Flex>
          </FormLabel>
          <InputGroup>
            <Input
              type={show?"text":"password"}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              bg="gray.700"
              border="1px solid"
              borderColor="gray.600"
              color="white"
              fontFamily="'Fira Code', monospace"
              _hover={{ borderColor: "orange.400" }}
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px #ED8936" }}
              _placeholder={{ color: "gray.400" }}
            />
            <InputRightElement>
              <Button 
                h="1.75rem" 
                size="sm" 
                onClick={handleClick}
                bg="transparent"
                color="gray.400"
                _hover={{ color: "orange.400", bg: "gray.600" }}
              >
                <Icon as={show ? FaEyeSlash : FaEye} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <FormLabel 
            color="gray.300" 
            fontFamily="'Fira Code', monospace"
            fontSize="sm"
          >
            <Flex align="center" gap={2}>
              <Icon as={FaImage} color="pink.400" />
              Profile Avatar
            </Flex>
          </FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            bg="gray.700"
            border="1px solid"
            borderColor="gray.600"
            color="white"
            fontFamily="'Fira Code', monospace"
            _hover={{ borderColor: "pink.400" }}
            _focus={{ borderColor: "pink.400", boxShadow: "0 0 0 1px #ED64A6" }}
            sx={{
              "::file-selector-button": {
                bg: "gray.600",
                border: "1px solid",
                borderColor: "gray.500",
                color: "white",
                borderRadius: "md",
                mr: 3,
                _hover: {
                  bg: "gray.500"
                }
              }
            }}
          />
        </FormControl>

        <Button
          bgGradient="linear(to-r, purple.400, pink.400)"
          color="white"
          width="100%"
          mt={6}
          type="submit"
          isLoading={loading}
          fontFamily="'Fira Code', monospace"
          fontWeight="bold"
          _hover={{
            bgGradient: "linear(to-r, purple.300, pink.300)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(159, 122, 234, 0.3)"
          }}
          _active={{
            transform: "translateY(0px)"
          }}
        >
          {"{ Register Account }"}
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;