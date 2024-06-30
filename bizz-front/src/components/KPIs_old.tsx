import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'

const Frameworks: React.FC = () => {
  const [greenhouseComet, setGreenhouseComet] = useState<number | null>(null)

  const handleCalculateTotalGreenhouse = () => {
    axios
      .post('http://127.0.0.1:5000/api/get_numeric_answer_single', { message: 'What is the total greenhouse gas emission for comet?' })
      .then((response) => {
        const value = parseFloat(response.data.response); // Assuming the API response is a numeric value
        // setGreenhouseComet(value)
        // console.log(response.data.response)
        setGreenhouseComet(value);
      })
      .catch((error) => {
        console.error('There was an error sending the message!', error)
      })
  }

  return (
    <VStack spacing={4} align="center">
      <Heading>Greenhouse Gas Emission Calculator</Heading>
      <Text>Tell a bit about your company</Text>
      <Button onClick={handleCalculateTotalGreenhouse}>Calculate Total Greenhouse Emission</Button>
      {greenhouseComet !== null && (
        <Text>Total Greenhouse Gas Emission for Comet: {greenhouseComet}</Text>
      )}
    </VStack>
  )
}

export default Frameworks
