import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const BizzWizz = () => {
  return (
    <Box>
      <Link to="/">
        <img src={'/BizzWizz.png'} width={'120px'} />
      </Link>
    </Box>
  )
}

export default BizzWizz
