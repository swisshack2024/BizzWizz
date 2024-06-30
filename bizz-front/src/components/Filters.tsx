import { FormLabel, Select, VStack } from '@chakra-ui/react'
import React from 'react'
import useFiltersStore from '../useFiltersStore'
import { countries } from '../utl/loadData.ts'

const Filters: React.FC = () => {
  const { filters, setIndustry, setCountry, setSize, setCompanyType } =
    useFiltersStore()

  const handleIndustryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIndustry(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value)
  }

  const handleCompanyTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCompanyType(event.target.value)
  }

  return (
    <VStack align={'left'}>
      <FormLabel>Country</FormLabel>
      <Select value={filters.country} onChange={handleCountryChange}>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
        {/* Add other country options here */}
      </Select>
      <FormLabel>Industry</FormLabel>
      <Select value={filters.industry} onChange={handleIndustryChange}>
        <option value="Software">Software</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
        <option value="Automotive">Automotive</option>
        <option value="Other">Other</option>
      </Select>

      <FormLabel>Size</FormLabel>
      <Select value={filters.size} onChange={handleSizeChange}>
        <option value="100-250 employees">100-250 employees</option>
        <option value="250-500 employees">250-500 employees</option>
        <option value="500-1000 employees">500-1000 employees</option>
        <option value="1000-5000 employees">1000-5000 employees</option>
        <option value="5000+ employees">5000+ employees</option>
      </Select>
    </VStack>
  )
}

export default Filters
