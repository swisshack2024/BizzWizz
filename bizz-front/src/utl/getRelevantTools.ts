import { tools} from "./loadData.ts";
import {filterCompanies} from "./filterCompanies.ts";

export async function getRelevantTools({
    industry,
    country,
    min_number_employees,
    max_number_employees,
}: {industry: string, country: string, min_number_employees: number, max_number_employees: number}) {
    const filteredCompanies = await filterCompanies({industry, country, min_number_employees, max_number_employees})

    const relevantTools = tools
        .filter(tool => tool.industries.includes(industry) || tool.industries.includes("All industries"))
        .map(tool => {
            return {
                ...tool,
                companies: filteredCompanies
            };
        });

    return relevantTools;
}
