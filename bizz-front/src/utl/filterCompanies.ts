import {companyToEmployees, countryToIndustryToCompany} from "./loadData.ts";

export async function filterCompanies({
    industry,
    country,
    min_number_employees,
    max_number_employees,
}: {industry: string, country: string, min_number_employees: number, max_number_employees: number}) {
    // 1. Filter companies based on the industry and country
    const companiesInIndustryAndCountry = countryToIndustryToCompany[country]?.[industry] || [];

    // 2. Filter companies based on the number of employees
    const filteredCompanies = companiesInIndustryAndCountry.filter(company => {
        const employeeCount = companyToEmployees[company];
        return employeeCount >= min_number_employees && employeeCount <= max_number_employees;
    });

    return filteredCompanies
}
