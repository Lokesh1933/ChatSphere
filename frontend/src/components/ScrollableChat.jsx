import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic'
import { ChatState } from '../Context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'
const ScrollableChat = ({messages}) => {
    const {user} = ChatState()
  return (
    <ScrollableFeed >
        {messages && messages.map((m, i) => (
          <div style={{display:"flex"}} key={m._id} t>
            {
                (isSameSender(messages, m, i, user._id) || isLastMessage(messages,i,user._id)) && (
                    <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                        <Avatar
                            mt="7px"
                            mr={1}
                            size="sm"
                            cursor="pointer"
                            name={m.sender.name}
                            src={m.sender.pic}

                        ></Avatar>
                    </Tooltip>
                )
            }
            <span
              className="message-bubble message-text"
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#4FD1C7" : "#2D3748"  // Teal for sent, dark gray for received
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: `${
                  m.sender._id === user._id ? "#1A202C" : "#E2E8F0"  // Dark text for sent, light for received
                }`,
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "1.4",
                wordBreak: "break-word",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: `1px solid ${
                  m.sender._id === user._id ? "#319795" : "#4A5568"  // Subtle border
                }`
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
