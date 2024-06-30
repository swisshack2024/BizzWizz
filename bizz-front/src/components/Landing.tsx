import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Filters from './Filters'
import { useNavigate } from 'react-router-dom'

const Landing: React.FC = () => {
  const navigate = useNavigate()
  return (
    <VStack p={20} align="left">
      <Heading>Hi, user!</Heading>
      <Text my={8}>Tell a bit about your company</Text>
      <Filters />
      <Button
        mt={8}
        onClick={() => navigate('/home')}
        bgColor={'#1D4ED8'}
        color={'white'}
      >
        Get started
      </Button>
    </VStack>
  )
}

export default Landing
