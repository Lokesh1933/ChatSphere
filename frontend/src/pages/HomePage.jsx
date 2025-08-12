// import React from "react";
// import { Box, Container, Tabs, Text , TabList,TabPanel,TabPanels,Tab} from "@chakra-ui/react";
// import Login from "../components/Authentication/Login";
// import Signup from "../components/Authentication/Signup";

// const HomePage = () => {
//   return (
//     <Container maxW="xl" centerContent>
//       <Box
//         d="flex"
//         justifyContent="center"
//         p={3}
//         bg={"white"}
//         w="100%"
//         m="40px 0 15px 0"
//         borderRadius="lg"
//         borderWidth="1px"
//         textAlign="center"
//       >
//         <Text fontSize="4xl" fontFamily="Work sans" color="black">
//           Chat-Sphere
//         </Text>
//       </Box>
//       <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
//         <Tabs variant="soft-rounded" colorScheme="blue">
//           <TabList mb='1em'>
//             <Tab width='50%'>Login</Tab>
//             <Tab width='50%'>Signup</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               {/* Login component */}
//               <Login />
//             </TabPanel>
//             <TabPanel>
//               {/* Signup component */}
//               <Signup />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </Container>
//   );
// };

import React, { useEffect } from "react";
import { 
  Box, 
  Container, 
  Tabs, 
  Text, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tab,
  useColorModeValue,
  Flex,
  Icon
} from "@chakra-ui/react";
import { FaCode, FaTerminal } from "react-icons/fa";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.900, blue.900, purple.900)",
    "linear(to-br, gray.900, blue.900, purple.900)"
  );
  //if user already logged in push to chat page
  const history = useHistory()
  useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if(user) {
            history.push('/chats')
        }
  }, [history])
  
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={6}
        bg="gray.800"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="cyan.400"
        textAlign="center"
        boxShadow="0 0 20px rgba(0, 255, 255, 0.3)"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: "linear(45deg, transparent, rgba(0, 255, 255, 0.1), transparent)",
          zIndex: 0
        }}
      >
        <Flex align="center" gap={3} position="relative" zIndex={1}>
          <Icon as={FaCode} boxSize={8} color="cyan.400" />
          <Text 
            fontSize="4xl" 
            fontFamily="'Fira Code', 'Courier New', monospace" 
            color="white"
            fontWeight="bold"
            textShadow="0 0 10px rgba(0, 255, 255, 0.5)"
          >
            Chat-Sphere
          </Text>
          <Icon as={FaTerminal} boxSize={8} color="green.400" />
        </Flex>
        <Text 
          fontSize="sm" 
          color="gray.400" 
          fontFamily="'Fira Code', monospace"
          position="relative"
          zIndex={1}
          mt={1}
        >
          {"<Developer Chat Platform />"}
        </Text>
      </Box>
      
      <Box 
        bg="gray.800" 
        w="100%" 
        p={6} 
        borderRadius="xl" 
        borderWidth="1px"
        borderColor="gray.600"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          bgGradient: "linear(to-r, cyan.400, blue.400, purple.400)",
          borderRadius: "xl xl 0 0"
        }}
      >
        <Tabs variant="enclosed" colorScheme="cyan">
          <TabList 
            mb="1em" 
            bg="gray.700" 
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.600"
          >
            <Tab 
              width="50%" 
              color="gray.300"
              fontFamily="'Fira Code', monospace"
              fontWeight="bold"
              _selected={{
                color: "cyan.400",
                bg: "gray.800",
                borderColor: "cyan.400",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
              }}
              _hover={{
                color: "cyan.300"
              }}
            >
              Login
            </Tab>
            <Tab 
              width="50%"
              color="gray.300"
              fontFamily="'Fira Code', monospace"
              fontWeight="bold"
              _selected={{
                color: "cyan.400",
                bg: "gray.800",
                borderColor: "cyan.400",
                boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
              }}
              _hover={{
                color: "cyan.300"
              }}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Login />
            </TabPanel>
            <TabPanel p={0}>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
