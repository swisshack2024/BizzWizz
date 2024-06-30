// import { companies, companyToEmployees, countries, countryToIndustryToCompany, industries, sustainabilityTools } from './dataLoader'; // Ensure this path is correct
import {companyToEmployees, countryToIndustryToCompany, sustainabilityTools} from "./loadData.ts";

export async function getSustainabilityTools({
    industry, country, min_number_employees, max_number_employees
}: {industry: string, country: string, min_number_employees: number, max_number_employees: number}) {
    // 1. Filter companies based on the industry and country
    const companiesInIndustryAndCountry = countryToIndustryToCompany[country]?.[industry] || [];

    // 2. Filter companies based on the number of employees
    const filteredCompanies = companiesInIndustryAndCountry.filter(company => {
        const employeeCount = companyToEmployees[company];
        return employeeCount >= min_number_employees && employeeCount <= max_number_employees;
    });

    // 3. Collect sustainability tools for the filtered companies
    // 3. Collect sustainability tools for the filtered companies
    const relevantTools = sustainabilityTools
        .filter(tool => tool.industries.includes(industry) || tool.industries.includes("All industries"))
        .map(tool => {
            return {
                ...tool,
                companies: filteredCompanies
            };
        });

    return relevantTools;
}
