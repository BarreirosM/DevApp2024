import React, { useState, useCallback, useEffect } from 'react'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'
import { collection, getDoc, doc, addDoc, arrayUnion, updateDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/FirebaseConfig";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

const PlaceholderImage = require('@/assets/images/cachorro_placeholder.jpg');

const db = FIREBASE_DB;

async function fetchDataChat(chatID: any) {
  const data = await getDoc(doc(db, `Chats/${chatID}`))
  return { id: data.id, ...data.data() };
}

export default function Chat() {

  const glob = useGlobalSearchParams();
  const userID = String(glob["conversas"]);
  const chatID = String(glob["chatID?"]);
  const [messages, setMessages] = useState<IMessage[]>([]);


  const renderBubble = (props: any) => {
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

  useEffect(() => {
    async function getMessages() {
        const aux = await getDoc(doc(db, `Chats/${chatID}`));
        const men = {id: aux.id, ...aux.data()}
        console.log(men.mensagens)
        setMessages(
            men.mensagens.reverse().map(doc => ({
                _id: doc._id,
                createdAt: doc.createdAt.toDate(),
                text: doc.text,
                user: doc.user,
            }))
        );
    }
    getMessages();
}, []);

//função que aciona assim que envia a mensagem no 
const mensagemEnviada = useCallback((messages = []) => {
    setMessages((previousMessages) =>GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    const docAux = doc(db, "Chats", chatID);
        const respons = updateDoc(docAux, {
          mensagens: arrayUnion({
            _id: _id,
            createdAt: createdAt,
            text: text,
            user: user,
          }),
        });

}, []);
  return (
    <GiftedChat
          messages={messages}
          onSend={msg => mensagemEnviada(msg)}
          user={{
                _id: userID,
            }}

      renderBubble={renderBubble}
    />
  )
}