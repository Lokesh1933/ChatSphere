/* eslint-disable no-unused-vars */
import {
    Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
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
      // axios.post("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload", data)
      fetch("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload", {
        method: "POST",
        body: data,
      })
        // .then((response) => response.json())
        // .then((data) => {
        //   setPic(data.url.toString());
        //   console.log(data.url.toString());
        //   setLoading(false);
        // })
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
      // .then((response) => {
      //   setPic(response.data.url.toString());
      //   setLoading(false);
      //   toast({
      //     title: "Image uploaded successfully!",
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      // })
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
    // console.log("Submit handler called");
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
      return
    }
    if(password !== confirmpassword){
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    //api request to store the below in daatbase
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const {data}  =  await axios.post("/api/user", {name,email,password,pic},config)
      toast({
        title: 'Registration Succesful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setLoading(false)
      //if user has successfully logged in we push him to chats page
      history.push('/chats')
    } catch (error) {
      // console.log("Error response:", error.response);
      toast({
        title: 'Error Occured!',
        description:error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      setLoading(false)
    }
  }

  return (
    <form
    onSubmit={(e) => {
      e.preventDefault();
      submitHandler();
    }}
    style={{ width: "100%" }}
  >
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor='blue.400'
            type={show?"text":"password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
          <Input
            focusBorderColor='blue.400'
            type={show?"text":"password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <InputGroup>
          <Input
            
            type="file"
            p={1.5}
            accept="image/*"
            
            onChange={(e) => postDetails(e.target.files[0])}
          />
          
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{marginTop: 15}}
        // onClick={submitHandler} //added it in the form better to handle submit there
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
    </form>
  );
};

export default Signup;
