import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, { useState } from 'react'
import Frameworks from './Frameworks'
import KPIs from './KPIs'
import Tools from './Tools'
import Dashboards from './Dashboards.tsx'

const Recommender: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Tabs
      variant="enclosed"
      w="100%"
      mt={2}
      index={tabIndex}
      onChange={(index) => {
        setTabIndex(index)
      }}
    >
      <TabList>
        <Tab>Frameworks</Tab>
        <Tab>KPIs</Tab>
        <Tab>Tools</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Frameworks nextTab={() => setTabIndex(1)} />
        </TabPanel>
        <TabPanel>
          <KPIs nextTab={() => setTabIndex(2)} />
        </TabPanel>
        <TabPanel>
          <Tools />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Recommender
