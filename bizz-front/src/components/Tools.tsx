import { Button, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useFiltersStore from '../useFiltersStore.ts'
import { colors } from '../colors.tsx'
import useChoicesStore from '../useChoicesStore.ts'
import { useNavigate } from 'react-router-dom'
import { getRandomNumberAsString, renderWithLogos } from './Frameworks.tsx'
import { getRelevantTools } from '../utl/getRelevantTools.ts'

interface ToolCardProps {
  tool: {
    name: string
    description: string
    tools: string[]
    companies: string[]
    match: string
  }
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { choices, setChoices } = useChoicesStore()
  return (
    <VStack
      align="left"
      border={'1px solid #ccc'}
      borderRadius={10}
      p={4}
      w="80%"
      onClick={() => {
        setChoices({ ...choices, tools: [...choices.tools, tool.name] })
      }}
      bgColor={choices.tools.includes(tool.name) ? colors.myGrey : 'white'}
    >
      <HStack
        w="100%"
        justifyContent={'space-between'}
        alignContent={'space-between'}
      >
        <Heading size="md">{tool.name}</Heading>
        <VStack gap={0}>
          <Text fontSize={'lg'} fontWeight={'800'} m={0} p={0}>
            {getRandomNumberAsString()}%
          </Text>
          <Text m={0} p={0}>
            match
          </Text>
        </VStack>
      </HStack>
      <Text>{tool.description}</Text>
      <VStack align="left">
        <Text>Used by</Text>
        <VStack align="left">
          <HStack>{renderWithLogos(tool.companies)}</HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

const Tools: React.FC = () => {
  const { filters } = useFiltersStore()
  const [tools, setTools] = useState([])
  const { choices } = useChoicesStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTools = async () => {
      const industry = filters.industry
      const country = filters.country

      const sizeParts = filters.size.split(' ')
      const range = sizeParts[0].split('-')

      const min_number_employees = parseInt(range[0], 10)

      let max_number_employees
      if (range[1]) {
        max_number_employees = parseInt(range[1], 10)
      } else {
        max_number_employees = Number.MAX_SAFE_INTEGER // A very large number for "5000+ employees"
      }

      const frameWorks = await getRelevantTools({
        industry,
        country,
        min_number_employees,
        max_number_employees,
      })

      setTools(frameWorks)
    }

    fetchTools()
  }, [filters])

  return (
    <>
      <VStack
        align={'left'}
        p={6}
        mb={2}
        bgColor={colors.myGreyDark}
        w={'70%'}
        borderRadius={8}
      >
        <Heading size={'md'}>Finally, choose your tooling </Heading>
        <Text>
          You need tools to do your reporting. Pick the most suiting ones.
        </Text>
        {choices.tools.length > 0 && (
          <Button
            bgColor={'#1D4ED8'}
            color={'white'}
            w={'fit-content'}
            onClick={() => navigate('/guide')}
          >
            Next {'>>'}
          </Button>
        )}
      </VStack>
      <VStack align={'left'}>
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </VStack>
    </>
  )
}

export default Tools
