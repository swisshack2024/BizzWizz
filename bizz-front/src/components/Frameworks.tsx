import { Button, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useFiltersStore from '../useFiltersStore.ts'
import { getSustainabilityTools } from '../utl/sustainabilityTools.ts'
import { colors } from '../colors.tsx'
import useChoicesStore from '../useChoicesStore.ts'

// Define the props for FrameworkCard
interface FrameworkCardProps {
  frameWork: {
    name: string
    description: string
    kpis: string[]
    tools: string[]
    companies: string[]
    match: string
  }
  nextTab: () => void
}
export const getCompanyLogoSrc = (company: string) => {
  // Assuming your images are stored in assets folder with a .png extension
  return `/${company.replace(' ', '_')}.png`
}

export const renderWithLogos = (tools) => {
  return tools.map((tool, index) => {
    const companyName = tool

    return (
      <img
        key={index}
        src={getCompanyLogoSrc(tool)}
        alt={tool}
        style={{ height: '30px', width: 'auto', marginRight: '10px' }}
      />
    )
  })
}

export function getRandomNumberAsString() {
  // Generate a random number between min and max (inclusive)
  const max = 99
  const min = 60
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

  // Convert the number to a string
  return randomNumber.toString()
}

// Update the FrameworkCard component to receive the frameWork prop
const FrameworkCard: React.FC<FrameworkCardProps> = ({
  frameWork,
  nextTab,
}) => {
  const { choices, setChoices } = useChoicesStore()
  return (
    <VStack
      align="left"
      border={'1px solid #ccc'}
      borderRadius={10}
      p={4}
      w="80%"
      onClick={() => {
        setChoices({ ...choices, framework: frameWork.name })
        nextTab()
      }}
    >
      <HStack
        w="100%"
        justifyContent={'space-between'}
        alignContent={'space-between'}
      >
        <Heading size="md">{frameWork.name}</Heading>
        <VStack gap={0}>
          <Text fontSize={'lg'} fontWeight={'800'} m={0} p={0}>
            {getRandomNumberAsString()}%
          </Text>
          <Text m={0} p={0}>
            match
          </Text>
        </VStack>
      </HStack>
      <Text>{frameWork.description}</Text>
      <HStack mt={2} gap={8}>
        <VStack align="left">
          <Text>KPIs</Text>
          <HStack>
            {frameWork.kpis.map((kpi, index) => (
              <Tag key={index} colorScheme="blue">
                {kpi}
              </Tag>
            ))}
          </HStack>
        </VStack>
        <VStack align="left">
          <Text>Tools</Text>
          <HStack>
            {frameWork.tools.map((tool, index) => {
              return <Tag>{tool}</Tag>
            })}
          </HStack>
        </VStack>
      </HStack>
      <VStack align="left">
        <Text>Used by</Text>
        <VStack align="left">
          <HStack>{renderWithLogos(frameWork.companies)}</HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

const Frameworks: React.FC = ({ nextTab }) => {
  const { filters } = useFiltersStore()
  const [frameWorks, setFrameWorks] = useState([])

  useEffect(() => {
    const fetchFrameWorks = async () => {
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

      const frameWorks = await getSustainabilityTools({
        industry,
        country,
        min_number_employees,
        max_number_employees,
      })

      setFrameWorks(frameWorks)
    }

    fetchFrameWorks()
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
        <Heading size={'md'}>Choose a framework first</Heading>
        <Text>
          ESG reporting is done in the context of 1+ frameworks. Pick the most
          suiting one.
        </Text>
      </VStack>
      <VStack align={'left'}>
        {frameWorks.map((frameWork, index) => (
          <FrameworkCard key={index} frameWork={frameWork} nextTab={nextTab} />
        ))}
      </VStack>
    </>
  )
}

export default Frameworks
