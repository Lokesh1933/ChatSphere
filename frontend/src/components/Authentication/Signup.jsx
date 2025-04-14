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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading,setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const toast = useToast()

  const handleClick = () => setShow(!show)
  const postDetails = (pics) => {
    setLoading(true)
    if(pics === undefined){
      toast({
        title: 'Please Select An Image!',
        status: 'warning',
        duration: 5000,
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
      fetch("https://api.cloudinary.com/v1_1/dlyywgd5s/image/upload",{
        method: 'post',
        body: data,
      }).then((res) => res.json())
        .then(data => {
          setPic(data.url.toString())
          console.log(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
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
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
  }

  return (
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
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
