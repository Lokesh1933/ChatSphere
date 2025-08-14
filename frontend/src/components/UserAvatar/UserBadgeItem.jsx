import { Badge } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg="#8B5CF6"  // Purple color like in your screenshot
      color="white"
      cursor="pointer"
      onClick={handleFunction}
      _hover={{ bg: "#7C3AED" }}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {user.name}
      {admin === user._id && <span>(Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  )
}

export default UserBadgeItem