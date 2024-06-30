import React, { useState } from 'react'
import axios from 'axios'
import { HStack, Heading } from '@chakra-ui/react'
import { FaBeer, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [show, setShow] = useState(true)

  const handleSendMessage = () => {
    axios
      .post('http://127.0.0.1:5000/api/chat', { message: chatInput })
      .then((response) => {
        setChatHistory([
          ...chatHistory,
          { role: 'user', content: chatInput },
          { role: 'assistant', content: response.data.response },
        ])
        setChatInput('')
      })
      .catch((error) => {
        console.error('There was an error sending the message!', error)
      })
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <HStack w="100%" justifyContent={'space-between'}>
          <Heading size={'md'} my={2}>
            Chatbot
          </Heading>
          {show && <FaChevronDown onClick={() => setShow(false)} />}
          {!show && <FaChevronUp onClick={() => setShow(true)} />}
        </HStack>
        {show && (
          <>
            <div className="chat-history h-64 overflow-y-auto border p-4 mb-4">
              {chatHistory.map((entry, index) => (
                <p key={index} className="mb-2">
                  <strong>{entry.role}:</strong> {entry.content}
                </p>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message here"
                className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatBox
