import React from 'react'
import {
  Box,
  ChakraProvider,
  HStack,
  VStack,
  Text,
  extendTheme,
  Heading,
  Button,
} from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatBox from './components/ChatBox'
import Landing from './components/Landing'
import Recommender from './components/Recommender'
import BizzWizz from './components/BizzWizz'
import Guide from './components/Guide'
import { colors } from './colors'
import Dashboards from './components/Dashboards'

const theme = extendTheme({})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HStack align="top">
                <VStack
                  borderRight={'1px solid #ccc'}
                  h="100vh"
                  p={10}
                  w="350px"
                  bgColor={colors.myGrey}
                >
                  <BizzWizz />

                  <Box w={'350px'}>
                    <Text p={16}>
                      BizzWizz helps you pick the right framework, KPIs and
                      tools for sustainability reporting.
                    </Text>
                  </Box>
                </VStack>
                <Landing />
              </HStack>
            }
          />
          <Route
            path="/home"
            element={
              <HStack align="top">
                <Navbar />
                <Recommender />
                <Box position="absolute" right={4} bottom={4}>
                  <ChatBox />
                </Box>
              </HStack>
            }
          />
          <Route
            path="/guide"
            element={
              <HStack align="top">
                <VStack
                  borderRight={'1px solid #ccc'}
                  h="100vh"
                  p={10}
                  w="350px"
                  bgColor={colors.myGrey}
                >
                  <BizzWizz />

                  <Box w={'350px'}>
                    <Text p={16}></Text>
                  </Box>
                </VStack>
                <Guide />
              </HStack>
            }
          />
          <Route
            path="/dashboard"
            element={
              <VStack align="top">
                <Heading>Example dashboard</Heading>
                <Link to={'/guide'}>
                  <Button
                    w="fit-content"
                    onClick={() => {}}
                    bgColor={'#1D4ED8'}
                    color={'white'}
                  >
                    {'<< '}Go back
                  </Button>
                </Link>
                <Dashboards />
              </VStack>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
