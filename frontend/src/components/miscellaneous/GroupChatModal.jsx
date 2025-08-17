import {
  FormControl,
  Input,
  useDisclosure,
  useToast,
  Box,
  Text,
  Badge,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const handleClose = () => {
    setSelectedUsers([]);
    setSearch("");
    setSearchResult([]);
    setGroupChatName("");
    onClose();
  };

  const handleSearch = async (query) => {
    setSearch(query);
    setSearchResult([]);
    setLoading(false);

    // show limited users eg 20
    if (!query) {
      // Load all users when search is empty
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?limit=20`, config);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        setLoading(false);
      }
      return;
    }
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${query}`, config);
        // console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        setLoading(false);
        setSearchResult([]);
        toast({
          title: "Error Occured",
          description: "Failed to load search results",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }, 300);
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      {/* here changing onclose to handle close */}
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          bg="#1A202C"
          color="white"
          border="1px solid"
          borderColor="#2D3748"
        >
          <ModalHeader
            fontSize="28px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            color="#00BCD4"
            borderBottom="1px solid #2D3748"
            fontWeight="bold"
            textShadow="0 0 5px rgba(0, 188, 212, 0.6),
              0 0 10px rgba(0, 188, 212, 0.4),
              0 0 15px rgba(0, 188, 212, 0.2)"
            //    letterSpacing="1px"
            bgGradient="linear-gradient(90deg, #00BCD4, #ffffff, #00BCD4)"
            bgClip="text"
            backgroundSize="300% auto"
            animation="gradientMove 5s linear infinite"
            sx={{
              "@keyframes gradientMove": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "300% 50%" },
              },
            }}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton color="#00BCD4" onClick={handleClose} />

          <ModalBody py={6}>
            <Stack spacing={4}>
              <FormControl>
                <Input
                  placeholder="Chat Name"
                  bg="#2D3748"
                  border="1px solid #4A5568"
                  color="white"
                  _placeholder={{ color: "#A0AEC0" }}
                  _focus={{ borderColor: "#00BCD4" }}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Input
                  placeholder="Add Users eg: John, King, Abc"
                  bg="#2D3748"
                  border="1px solid #4A5568"
                  color="white"
                  _placeholder={{ color: "#A0AEC0" }}
                  _focus={{ borderColor: "#00BCD4" }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>

              {/* selected users to display */}
              {selectedUsers.length > 0 && (
                <Box w="100%" display="flex" flexWrap="wrap">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </Box>
              )}

              {/* Search Results Display */}
              <Box>
                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <Spinner color="#00BCD4" />
                  </Box>
                ) : searchResult.length > 0 ? (
                  <Box maxH="200px" overflowY="auto">
                    {searchResult
                      .filter(
                        (user) =>
                          !selectedUsers.find(
                            (selected) => selected._id === user._id
                          )
                      )
                      .slice(0, 4)
                      .map((user) => (
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => handleGroup(user)}
                        />
                      ))}
                  </Box>
                ) : search && !loading ? (
                  <Text color="#A0AEC0" fontSize="sm" textAlign="center">
                    No users found
                  </Text>
                ) : null}
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter borderTop="1px solid #2D3748">
            <Button
              bg="#00BCD4"
              color="#1A202C"
              _hover={{ bg: "#00ACC1" }}
              onClick={handleSubmit}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
