import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'
const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: PlaceholderImage,
      },
    },
  ])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#ffffff",
          },
          right: {
            backgroundColor: "#88c9bf",
          },
        }}
      />
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
    />
  )
}