import { Box, VStack } from '@chakra-ui/react'
import Filters from './Filters'
import BizzWizz from './BizzWizz'
import { colors } from '../colors'

export default function Navbar() {
  return (
    <>
      <VStack
        borderRight={'1px solid #ccc'}
        h="100vh"
        p={10}
        w="350px"
        bgColor={colors.myGrey}
      >
        <BizzWizz />

        <Box mt={8}>
          <Filters />
        </Box>
      </VStack>
    </>
  )
}
