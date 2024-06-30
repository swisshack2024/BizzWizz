import { Button, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import useFiltersStore from '../useFiltersStore'
import useChoicesStore from '../useChoicesStore'
import { Link, useNavigate } from 'react-router-dom'

const Guide: React.FC = () => {
  const { resetFilters } = useFiltersStore()
  const { choices, resetChoices } = useChoicesStore()
  const navigate = useNavigate()
  return (
    <VStack p={20} align="left">
      <Heading>Your sustainability guide is ready!</Heading>
      <VStack align="left" p={6} bgColor={'#f0f0f0'} borderRadius={10} mt={10}>
        <Heading size="md" mt={4}>
          Framework
        </Heading>
        <Text>{choices.framework}</Text>
        <Heading size="md" mt={4}>
          KPIs
        </Heading>
        {choices.kpis.map((kpi) => (
          <Text key={kpi}>{kpi}</Text>
        ))}
        <Heading size="md" mt={4}>
          Tools
        </Heading>
        {choices.tools.map((tool) => (
          <Text key={tool}>{tool}</Text>
        ))}
      </VStack>
      <HStack>
        <Button mt={8} bgColor={'#1D4ED8'} color={'white'}>
          Download as PDF
        </Button>

        <Button mt={8} bgColor={'#1D4ED8'} color={'white'}>
          Share with team
        </Button>
        <Link to="/dashboard">
          <Button mt={8} bgColor={'#1D4ED8'} color={'white'}>
            See example dashboard
          </Button>
        </Link>
      </HStack>
      <Button
        mt={8}
        bgColor={'#1D4ED8'}
        color={'white'}
        w={'fit-content'}
        onClick={() => {
          resetFilters()
          resetChoices()
          navigate('/')
        }}
      >
        Start over
      </Button>
    </VStack>
  )
}

export default Guide
