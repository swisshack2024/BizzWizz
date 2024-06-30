import { Button, HStack, Heading, Tag, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useFiltersStore from '../useFiltersStore.ts'
import { colors } from '../colors.tsx'
import useChoicesStore from '../useChoicesStore.ts'
import { getRelevantKPIs } from '../utl/getRelevantKPIs.ts'
import { getCompanyLogoSrc, getRandomNumberAsString } from './Frameworks.tsx'
import { renderWithLogos } from './Frameworks.tsx'

interface KPICardProps {
  kpi: {
    name: string
    description: string
    tools: string[]
    companies: string[]
    match: string
  }
}

const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  const { choices, setChoices } = useChoicesStore()
  return (
    <VStack
      align="left"
      border={'1px solid #ccc'}
      borderRadius={10}
      p={4}
      w="80%"
      onClick={() =>
        setChoices({ ...choices, kpis: [...choices.kpis, kpi.name] })
      }
      bgColor={choices.kpis.includes(kpi.name) ? colors.myGrey : 'white'}
    >
      <HStack
        w="100%"
        justifyContent={'space-between'}
        alignContent={'space-between'}
      >
        <Heading size="md">{kpi.name}</Heading>
        <VStack gap={0}>
          <Text fontSize={'lg'} fontWeight={'800'} m={0} p={0}>
            {getRandomNumberAsString()}%
          </Text>
          <Text m={0} p={0}>
            match
          </Text>
        </VStack>
      </HStack>
      <Text>{kpi.description}</Text>
      <VStack align="left">
        <Text>Used by</Text>
        <VStack align="left">
          <HStack>{renderWithLogos(kpi.companies)}</HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

const KPIs: React.FC = ({ nextTab }) => {
  const { filters } = useFiltersStore()
  const [kpis, setKpis] = useState([])
  const { choices } = useChoicesStore()

  useEffect(() => {
    const fetchKpis = async () => {
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

      // TODO rename
      const frameWorks = await getRelevantKPIs({
        industry,
        country,
        min_number_employees,
        max_number_employees,
      })

      console.log(frameWorks)

      setKpis(frameWorks)
    }

    fetchKpis()
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
        <Heading size={'md'}>Choose your KPIs</Heading>
        <Text>Pick the most relevant KPIs. We recommend picking 5+ KPIs.</Text>

        {choices.kpis.length > 0 && (
          <Button
            bgColor={'#1D4ED8'}
            color={'white'}
            w={'fit-content'}
            onClick={nextTab}
          >
            Next {'>>'}
          </Button>
        )}
      </VStack>
      <VStack align={'left'}>
        {kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </VStack>
    </>
  )
}

export default KPIs
